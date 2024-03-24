import { Component } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import TaskList from "../components/TaskList";
import TaskService from "../api/TaskService";
import ProjectService from "../api/ProjectService";
import ErrorMessage from "../components/ErrorMessage";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = { project: null, tasks: [], error: null };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.fetchProject(id);
    this.fetchTasks(id);
  }

  fetchProject = async (id) => {
    try {
      const project = await ProjectService.fetchProject(id);
      this.setState({ project });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  fetchTasks = async (id) => {
    try {
      const tasks = await TaskService.fetchTasks(id);
      this.setState({ tasks });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      const tasks = this.state.tasks.filter((task) => task._id !== id);
      this.setState({ tasks });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { project, tasks, error } = this.state;
    const { id } = this.props.params;

    if (error) return <ErrorMessage error={error} />;

    return (
      <>
        <h3 className="text-lg font-semibold p-4">{project?.name}</h3>
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
                <TaskList tasks={tasks} deleteTask={this.deleteTask} />
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex gap-2">
          <Link className="action-btn" to={`/task/create/${id}`}>
            New Task
          </Link>
        </div>
      </>
    );
  }
}

Tasks.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

function TasksWrapper() {
  const params = useParams();
  return <Tasks params={params} />;
}

export default TasksWrapper;
