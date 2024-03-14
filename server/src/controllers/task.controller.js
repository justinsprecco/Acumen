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
