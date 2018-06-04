import PropTypes from 'prop-types';

export default function Filterable(props) {
  const res = props.data.reduce((acc, datum, i) => {
    if (!props.query) {
      acc.push(props.renderer(datum, i));
    } else if (props.matcher(props.query, i, datum)) {
      acc.push(props.renderer(datum, i));
    }

    return acc;
  }, []);

  if (!res.length) {
    return props.emptyRenderer();
  }

  return res;
}

Filterable.defaultProps = {
  emptyRenderer: () => null,
};

Filterable.propTypes = {
  renderer: PropTypes.func.isRequired,
  matcher: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  query: PropTypes.string.isRequired,
  emptyRenderer: PropTypes.func,
};
