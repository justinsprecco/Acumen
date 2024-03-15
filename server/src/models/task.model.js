import { Schema, model } from "mongoose";
import Project from "./project.model.js";

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  creationDate: { type: Date, default: Date.now },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

taskSchema.statics.create = async function (projectId, name, description) {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project doesn't exist");

  const existingTask = await this.findOne({ project: projectId, name });
  if (existingTask) throw new Error("Task already exists");

  const task = new this({ name, description, project: projectId });
  await task.save();

  project.tasks.push(task._id);
  await project.save();

  return { task };
};

taskSchema.statics.getAllByProject = async function (projectId) {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project doesn't exist");

  const tasks = await Task.find({ _id: { $in: project.tasks } });
  return { tasks };
};

const Task = model("Task", taskSchema);

export default Task;
