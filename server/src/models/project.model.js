import { Schema, model, startSession } from "mongoose";

const projectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  creationDate: { type: Date, default: Date.now },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

projectSchema.statics.create = async function (name, description) {
  const existingProject = await this.findOne({ name });
  if (existingProject) throw new Error("Project already exists");

  const project = new this({ name, description });
  await project.save();

  return { project };
};

projectSchema.statics.getAll = async function () {
  const projects = await this.find({});
  return { projects };
};

projectSchema.statics.getById = async function (id) {
  let project = await this.findById(id);
  if (!project) throw new Error("Project not found");
  return { project };
};

projectSchema.statics.getTasks = async function (projectId) {
  const project = await Project.findById(projectId).populate("tasks");
  if (!project) throw new Error("Project doesn't exist");

  return { tasks: project.tasks };
};

projectSchema.statics.updateById = async function (id, name, description) {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;

  let project = await this.findByIdAndUpdate(id, updates, { new: true });
  if (!project) throw new Error("Project not found");
  return { project };
};

projectSchema.statics.removeById = async function (id) {
  const session = await startSession();

  try {
    session.startTransaction();
    const project = await this.findByIdAndDelete(id).session(session);
    if (!project) throw new Error("Project not found");

    await Tasks.deleteMany({ project: id }).session(session);

    await session.commitTransaction();
    return { project };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const Project = model("Project", projectSchema);

export default Project;
