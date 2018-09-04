import PropTypes from 'prop-types';
import shapePropType from './speed';
import pricePropType from './price';

export default PropTypes.shape({
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  nodeCount: PropTypes.number.isRequired,
  maxBandwidth: PropTypes.string,
  speed: shapePropType,
  price: pricePropType,
});
