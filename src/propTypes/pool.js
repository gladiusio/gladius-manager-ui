import PropTypes from 'prop-types';
import shapePropType from './speed';
import pricePropType from './price';

export default PropTypes.shape({
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  nodeCount: PropTypes.string.isRequired,
  maxBandwidth: PropTypes.string.isRequired,
  speed: shapePropType.isRequired,
  price: pricePropType.isRequired,
});
