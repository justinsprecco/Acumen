import { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TaskService from "../api/TaskService";
import ErrorMessage from "../components/ErrorMessage";

class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        name: "",
        description: "",
      },
      isNew: true,
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    if (id) this.fetchTask(id);
  }

  fetchTask = async (id) => {
    this.setState({ isNew: false });
    try {
      const task = await TaskService.fetchTask(id);
      this.setState({ task });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { task } = this.state;
    const { id, projectId } = this.props.params;
    try {
      let response;
      if (this.state.isNew) {
        response = await TaskService.createTask(projectId, task);
      } else {
        response = await TaskService.updateTask(id, task);
      }
      this.props.navigate(`/project/${response.project}`);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      task: {
        ...prevState.task,
        [name]: value,
      },
    }));
  };

  render() {
    const { task, error } = this.state;

    if (error) return <ErrorMessage error={error} />;
    return (
      <>
        <h3 className="text-left text-lg font-semibold p-4">
          Create/Update Task
        </h3>
        <form
          onSubmit={this.handleSubmit}
          className="border rounded-lg overflow-hidden p-4"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
            <div className="text-left">
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Task Info
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Create a unique name for your task along with a brief
                description.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm text-left font-medium leading-6 text-slate-900"
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
                      placeholder="Task Name"
                      value={task.name}
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
                      value={task.description}
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
              value="Save Task"
              className="action-btn cursor-pointer mt-4"
            />
          </div>
        </form>
      </>
    );
  }
}

TaskEdit.propTypes = {
  navigate: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string,
    projectId: PropTypes.string,
  }),
};

function TaskEditWrapper() {
  const params = useParams();
  const navigate = useNavigate();
  return <TaskEdit params={params} navigate={navigate} />;
}

export default TaskEditWrapper;
