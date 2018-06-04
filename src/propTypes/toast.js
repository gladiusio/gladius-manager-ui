import PropTypes from 'prop-types';

export default PropTypes.shape({
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  success: PropTypes.bool,
  text: PropTypes.string,
  warning: PropTypes.bool,
});
