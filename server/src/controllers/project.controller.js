import Project from "../models/project.model.js";

export async function create(req, res) {
  const { name, description } = req.body;

  try {
    const project = await Project.create(name, description);
    res.sendSuccess(201, project);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function getAll(req, res) {
  try {
    const projects = await Project.getAll();
    res.sendSuccess(200, projects);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function get(req, res) {
  const id = req.params.id;

  try {
    const project = await Project.getById(id);
    res.sendSuccess(200, project);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function update(req, res) {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const project = await Project.updateById(id, name, description);
    res.sendSuccess(200, project);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function remove(req, res) {
  const id = req.params.id;

  try {
    const project = await Project.removeById(id);
    res.sendSuccess(200, project);
  } catch (error) {
    res.sendError(500, error);
  }
}
