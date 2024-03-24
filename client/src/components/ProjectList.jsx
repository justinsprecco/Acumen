import { Component } from "react";
import Project from "./Project";
import PropTypes from "prop-types";

class ProjectList extends Component {
  render() {
    const { projects, deleteProject } = this.props;
    return projects.map((project) => (
      <Project
        project={project}
        deleteProject={() => deleteProject(project._id)}
        key={project._id}
      />
    ));
  }
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      creationDate: PropTypes.string,
    }),
  ).isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default ProjectList;
