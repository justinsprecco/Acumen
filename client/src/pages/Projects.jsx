import { Component } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../components/ProjectList";
import ProjectService from "../api/ProjectService";
import ErrorMessage from "../components/ErrorMessage";

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

  render() {
    const { projects, error } = this.state;

    if (error) return <ErrorMessage error={error} />;

    return (
      <>
        <h3 className="text-lg font-semibold p-4">Projects</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="data-head">Name</th>
                  <th className="data-head">Description</th>
                  <th className="data-head">Started</th>
                  <th className="data-head">Action</th>
                </tr>
              </thead>
              <tbody>
                <ProjectList
                  projects={projects}
                  deleteProject={this.deleteProject}
                />
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex gap-2">
          <Link className="action-btn" to={`/project/edit`}>
            New Project
          </Link>
        </div>
      </>
    );
  }
}

export default Projects;
