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

export async function get(req, res) {
  const id = req.params.id;

  try {
    const task = await Task.getById(id);
    res.sendSuccess(200, task);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function update(req, res) {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const task = await Task.updateById(id, name, description);
    res.sendSuccess(200, task);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function remove(req, res) {
  const taskId = req.params.id;

  try {
    const task = await Task.removeById(taskId);
    res.sendSuccess(200, task);
  } catch (error) {
    res.sendError(500, error);
  }
}
