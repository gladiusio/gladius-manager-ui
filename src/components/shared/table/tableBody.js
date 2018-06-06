import React from 'react';
import PropTypes from 'prop-types';
import getElementType from '../../../util/getElementType';

export default function TableBody(props) {
  const {
    children,
    className,
    ...rest
  } = props;
  const Element = getElementType(TableBody, props);

  return (
    <Element
      {...rest}
      className={className}
    >
      {children}
    </Element>
  );
}

TableBody.defaultProps = {
  as: 'tbody',
  children: [],
  className: '',
};

TableBody.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Main content
  children: PropTypes.node,

  // Additional classes
  className: PropTypes.string,
};
