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

  return { projectId: project._id };
};

const Project = model("Project", projectSchema);

export default Project;
