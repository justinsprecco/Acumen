const API_URL = "http://localhost:3000/api";

class TaskService {
  static async createTask(id, task) {
    try {
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to create task.");
      const data = await response.json();
      return data.task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async fetchTasks(id) {
    try {
      const response = await fetch(`${API_URL}/project/${id}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks.");
      const data = await response.json();
      return data.tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  static async fetchTask(id) {
    try {
      const response = await fetch(`${API_URL}/task/${id}`);
      if (!response.ok) throw new Error("Failed to fetch task.");
      const data = await response.json();
      return data.task;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }

  static async updateTask(id, task) {
    try {
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to update task.");
      const data = await response.json();
      return data.task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  static async deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task.");
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

export default TaskService;
