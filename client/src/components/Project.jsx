import { Link, useNavigate } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";

class Project extends Component {
  handleRowClick = () => {
    this.props.navigate(`/project/${this.props.project._id}`);
  };

  render() {
    const { project, deleteProject } = this.props;
    return (
      <tr className="border-b cursor-pointer" onClick={this.handleRowClick}>
        <td className="data-row">{project.name}</td>
        <td className="data-row">{project.description}</td>
        <td className="data-row">{project.creationDate}</td>
        <td className="data-row">
          <div className="flex gap-2">
            <Link
              className="action-btn"
              to={`/project/edit/${project._id}`}
              onClick={(e) => e.stopPropagation()}
            >
              Edit
            </Link>
            <button
              className="action-btn hover:bg-red-500 hover:text-red-100"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
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
  navigate: PropTypes.func.isRequired,
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    creationDate: PropTypes.string,
  }),
  deleteProject: PropTypes.func.isRequired,
};

function ProjectWrapper(props) {
  const navigate = useNavigate();
  return <Project {...props} navigate={navigate} />;
}

export default ProjectWrapper;
