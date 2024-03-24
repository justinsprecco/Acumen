import { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProjectService from "../api/ProjectService";
import ErrorMessage from "../components/ErrorMessage";

class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: "",
        description: "",
      },
      isNew: true,
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    if (id) this.fetchProject(id);
  }

  fetchProject = async (id) => {
    this.setState({ isNew: false });
    try {
      const project = await ProjectService.fetchProject(id);
      this.setState({ project });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { project } = this.state;
    const { id } = this.props.params;
    try {
      if (this.state.isNew) {
        await ProjectService.createProject(project);
      } else {
        await ProjectService.updateProject(id, project);
      }
      this.props.navigate("/");
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      project: {
        ...prevState.project,
        [name]: value,
      },
    }));
  };

  render() {
    const { project, error } = this.state;

    if (error) return <ErrorMessage error={error} />;
    return (
      <>
        <h3 className="text-left text-lg font-semibold p-4">
          Create/Update Project
        </h3>
        <form
          onSubmit={this.onSubmit}
          className="border rounded-lg overflow-hidden p-4"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
            <div className="text-left">
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Project Info
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Create a unique name for your project along with a brief
                description.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className=" block text-sm text-left font-medium leading-6 text-slate-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm text-left font-medium leading-6 text-slate-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="description"
                      id="position"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Brief Description"
                      value={project.description}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex align-left">
            <input
              type="submit"
              value="Save Project"
              className="action-btn cursor-pointer mt-4"
            />
          </div>
        </form>
      </>
    );
  }
}

ProjectEdit.propTypes = {
  navigate: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

function ProjectEditWrapper() {
  const params = useParams();
  const navigate = useNavigate();
  return <ProjectEdit params={params} navigate={navigate} />;
}

export default ProjectEditWrapper;
