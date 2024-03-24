import { Component } from "react";
import PropTypes from "prop-types";

class ErrorMessage extends Component {
  render() {
    const { error } = this.props;
    return (
      <div className="error-div">
        <strong className="font-bold">Error: </strong>
        <span className="block">{error}</span>
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMessage;
