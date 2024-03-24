import PropTypes from "prop-types";

function ErrorMessage({ error }) {
  return (
    <div className="error-div">
      <strong className="font-bold">Error: </strong>
      <span className="block">{error}</span>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMessage;
