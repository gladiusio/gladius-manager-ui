import PropTypes from 'prop-types';

export default PropTypes.shape({
  edited: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  errorMessage: PropTypes.string,
});
