import { Schema, model } from "mongoose";

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

projectSchema.statics.updateById = async function (id, name, description) {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;

  let project = await this.findByIdAndUpdate(id, updates, { new: true });
  if (!project) throw new Error("Project not found");
  return { project };
};

projectSchema.statics.removeById = async function (id) {
  const project = await this.findByIdAndDelete(id);
  if (!project) throw new Error("Project not found");
  return { project };
};

const Project = model("Project", projectSchema);

export default Project;
