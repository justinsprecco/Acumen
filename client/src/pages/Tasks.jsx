import { Component } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Task from "../components/Task";
import TaskService from "../api/TaskService";

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
      const project = await TaskService.fetchProject(id);
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

  taskList = () => {
    return this.state.tasks.map((task) => {
      return (
        <Task
          task={task}
          deleteTask={() => this.deleteTask(task._id)}
          key={task._id}
        />
      );
    });
  };

  thClass = "h-12 px-4 text-left align-middle font-medium";

  render() {
    const { project, error } = this.state;

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
        <h3 className="text-lg font-semibold p-4">{project?.name}</h3>
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
              <tbody>{this.taskList()}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  };
}

function TasksWrapper() {
  const params = useParams();
  return <Tasks params={params} />;
}

export default TasksWrapper;
