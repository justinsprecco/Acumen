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

  const result = new this({ name, description });
  await result.save();

  return { projectId: result._id };
};

projectSchema.statics.getAll = async function () {
  const results = await this.find({});
  return { projects: results };
};

projectSchema.statics.getById = async function (id) {
  let result = await this.findById(id);
  if (!result) throw new Error("Project not found");
  return { project: result };
};

projectSchema.statics.updateById = async function (id, name, description) {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;

  let result = await this.findByIdAndUpdate(id, updates, { new: true });
  if (!result) throw new Error("Project not found");
  return { project: result };
};

projectSchema.statics.removeById = async function (id) {
  const result = await this.findByIdAndDelete(id);
  if (!result) throw new Error("Project not found");
  return { project: result };
};

const Project = model("Project", projectSchema);

export default Project;
