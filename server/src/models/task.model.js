import { Schema, model, startSession } from "mongoose";
import Project from "./project.model.js";

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  creationDate: { type: Date, default: Date.now },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

taskSchema.statics.create = async function (projectId, name, description) {
  const session = await startSession();
  try {
    session.startTransaction();

    const project = await Project.findById(projectId).session(session);
    if (!project) throw new Error("Project doesn't exist");

    const existingTask = await this.findOne({
      project: projectId,
      name,
    }).session(session);
    if (existingTask) throw new Error("Task already exists");

    const task = new this({ name, description, project: projectId });
    await task.save({ session });

    project.tasks.push(task._id);
    await project.save({ session });

    await session.commitTransaction();
    return { task };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

taskSchema.statics.getById = async function (id) {
  let task = await this.findById(id);
  if (!task) throw new Error("Task not found");
  return { task };
};

taskSchema.statics.updateById = async function (id, name, description) {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;

  let task = await this.findByIdAndUpdate(id, updates, { new: true });
  if (!task) throw new Error("Task not found");
  return { task };
};

taskSchema.statics.removeById = async function (id) {
  const session = await startSession();

  try {
    session.startTransaction();
    const task = await this.findByIdAndDelete(id).session(session);
    if (!task) throw new Error("Task not found");

    await Project.updateOne({ tasks: id }, { $pull: { tasks: id } }).session(
      session,
    );

    await session.commitTransaction();
    return { task };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const Task = model("Task", taskSchema);

export default Task;
