const API_URL = "http://localhost:3000/api";

class ProjectService {
  static async fetchProjects() {
    try {
      const response = await fetch(`${API_URL}/project`);
      if (!response.ok) throw new Error("Failed to fetch projects.");
      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  static async deleteProject(id) {
    try {
      const response = await fetch(`${API_URL}/project/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project.");
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
}

export default ProjectService;
