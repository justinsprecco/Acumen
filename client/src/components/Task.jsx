import { Component } from "react";
import PropTypes from "prop-types";

const tdClass = "p-4 text-left align-middle";

class Task extends Component {
  render() {
    const { task, deleteTask } = this.props;
    return (
      <tr className="border-b">
        <td className={tdClass}>{task.name}</td>
        <td className={tdClass}>{task.description}</td>
        <td className={tdClass}>{task.creationDate}</td>
        <td className={tdClass}>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border hover:bg-slate-100 h-9 rounded-md px-3"
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
