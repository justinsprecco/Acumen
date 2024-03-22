import { Component } from "react";
import PropTypes from "prop-types";

const tdClass = "p-4 text-left align-middle";

class Project extends Component {
  render() {
    const { project, deleteProject } = this.props;
    return (
      <tr className="border-b">
        <td className={tdClass}>{project.name}</td>
        <td className={tdClass}>{project.description}</td>
        <td className={tdClass}>{project.creationDate}</td>
        <td className={tdClass}>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border hover:bg-slate-100 h-9 rounded-md px-3"
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
