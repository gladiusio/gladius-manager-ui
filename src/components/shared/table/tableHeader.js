import React from 'react';
import PropTypes from 'prop-types';
import getElementType from '../../../util/getElementType';

export default function TableHeader(props) {
  const {
    children,
    className,
    ...rest
  } = props;
  const Element = getElementType(TableHeader, props);

  return (
    <Element
      {...rest}
      className={className}
    >
      {children}
    </Element>
  );
}

TableHeader.defaultProps = {
  as: 'thead',
  children: [],
  className: '',
};

TableHeader.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Main content
  children: PropTypes.node,

  // Additional classes
  className: PropTypes.string,
};
