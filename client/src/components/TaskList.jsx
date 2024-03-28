import { Component } from "react";
import Task from "./Task";
import PropTypes from "prop-types";

class TaskList extends Component {
  render() {
    const { tasks, deleteTask } = this.props;
    return tasks.map((task) => (
      <Task
        task={task}
        deleteTask={() => deleteTask(task._id)}
        key={task._id}
      />
    ));
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      creationDate: PropTypes.string,
    }),
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
