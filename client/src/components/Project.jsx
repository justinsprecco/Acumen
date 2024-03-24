import { Link } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";

class Project extends Component {
  render() {
    const { project, deleteProject } = this.props;
    return (
      <tr className="border-b">
        <td className="data-row">{project.name}</td>
        <td className="data-row">{project.description}</td>
        <td className="data-row">{project.creationDate}</td>
        <td className="data-row">
          <div className="flex gap-2">
            <Link className="action-btn" to={`/project/edit/${project._id}`}>
              Edit
            </Link>
          </div>
          <div className="flex gap-2">
            <button
              className="action-btn"
              type="button"
              onClick={() => {
                deleteProject(project._id);
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

Project.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    creationDate: PropTypes.string,
  }),
  deleteProject: PropTypes.func.isRequired,
};

export default Project;
