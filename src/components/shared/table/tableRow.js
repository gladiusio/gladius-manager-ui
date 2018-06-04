import React from 'react';
import PropTypes from 'prop-types';
import getElementType from '../../../util/getElementType';

export default function TableRow(props) {
  const {
    children,
    className,
    ...rest
  } = props;
  const Element = getElementType(TableRow, props);

  return (
    <Element
      {...rest}
      className={className}
    >
      {children}
    </Element>
  );
}

TableRow.defaultProps = {
  as: 'tr',
  children: [],
  className: '',
};

TableRow.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Main content
  children: PropTypes.node,

  // Additional classes
  className: PropTypes.string,
};
