import { Link } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";

class Task extends Component {
  render() {
    const { task, deleteTask } = this.props;
    return (
      <tr className="border-b">
        <td className="data-row">{task.name}</td>
        <td className="data-row">{task.description}</td>
        <td className="data-row">{task.creationDate}</td>
        <td className="data-row">
          <div className="flex gap-2">
            <Link className="action-btn" to={`/task/edit/${task._id}`}>
              Edit
            </Link>
            <button
              className="action-btn hover:bg-red-500 hover:text-red-100"
              type="button"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    creationDate: PropTypes.string,
  }),
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
