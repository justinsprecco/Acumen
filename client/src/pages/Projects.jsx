import { Component } from "react";
import Project from "../components/Project";
import ProjectService from "../api/ProjectService";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], error: null };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    try {
      const projects = await ProjectService.fetchProjects();
      this.setState({ projects });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  deleteProject = async (id) => {
    try {
      await ProjectService.deleteProject(id);
      const projects = this.state.projects.filter(
        (project) => project._id !== id,
      );
      this.setState({ projects });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  projectList = () => {
    return this.state.projects.map((project) => {
      return (
        <Project
          project={project}
          deleteProject={() => this.deleteProject(project._id)}
          key={project._id}
        />
      );
    });
  };

  thClass = "h-12 px-4 text-left align-middle font-medium";

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block">{error}</span>
        </div>
      );
    }

    return (
      <>
        <h3 className="text-lg font-semibold p-4">Projects</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className={this.thClass}>Name</th>
                  <th className={this.thClass}>Description</th>
                  <th className={this.thClass}>Started</th>
                  <th className={this.thClass}>Action</th>
                </tr>
              </thead>
              <tbody>{this.projectList()}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Projects;
