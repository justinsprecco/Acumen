class ProjectService {
  static async createProject(project) {
    try {
      const response = await fetch(`/api/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error("Failed to create project.");
      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  static async fetchProjects() {
    try {
      const response = await fetch(`/api/project`);
      if (!response.ok) throw new Error("Failed to fetch projects.");
      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  static async fetchProject(id) {
    try {
      const response = await fetch(`/api/project/${id}`);
      if (!response.ok) throw new Error("Failed to fetch project.");
      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  }

  static async updateProject(id, project) {
    try {
      const response = await fetch(`/api/project/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error("Failed to update project.");
      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  static async deleteProject(id) {
    try {
      const response = await fetch(`/api/project/${id}`, {
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
