const API_URL = "http://localhost:3000/api";

class TaskService {
  static async fetchProject(id) {
    try {
      const response = await fetch(`${API_URL}/project/${id}`);
      if (!response.ok) throw new Error("Failed to fetch project.");
      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error("Error fetching project:", error);
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
