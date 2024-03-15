import Task from "../models/task.model.js";

export async function create(req, res) {
  const { projectId, name, description } = req.body;

  try {
    const taskId = await Task.create(projectId, name, description);
    res.sendSuccess(201, taskId);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function getAllByProject(req, res) {
  const projectId = req.params.id;

  try {
    const tasks = await Task.getAllByProject(projectId);
    res.sendSuccess(201, tasks);
  } catch (error) {
    res.sendError(500, error);
  }
}
