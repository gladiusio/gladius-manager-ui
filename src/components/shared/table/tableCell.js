import React from 'react';
import PropTypes from 'prop-types';
import getElementType from '../../../util/getElementType';

export default function TableCell(props) {
  const {
    as,
    children,
    className,
    ...rest
  } = props;
  const Element = getElementType(TableCell, props);

  return (
    <Element
      {...rest}
      as={as}
      className={className}
    >
      {children}
    </Element>
  );
}

TableCell.defaultProps = {
  as: 'td',
  children: [],
  className: '',
};

TableCell.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Main content
  children: PropTypes.node,

  // Additional classes
  className: PropTypes.string,
};
