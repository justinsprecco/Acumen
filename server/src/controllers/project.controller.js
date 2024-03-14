import Project from "../models/project.model.js";

export async function create(req, res) {
  const { name, description } = req.body;

  try {
    const projectId = await Project.create(name, description);
    res.sendSuccess(201, projectId);
  } catch (error) {
    res.sendError(500, error);
  }
}
