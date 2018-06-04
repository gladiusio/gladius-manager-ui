import PropTypes from 'prop-types';

export default PropTypes.shape({
  menuItem: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
});
