import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getElementType from '../../../util/getElementType';

/**
 * Wrapper component that renders content (aka segment) activated by a menu item
 */
export default function TabSegment(props) {
  const {
    children,
    className,
    ...rest
  } = props;
  const Element = getElementType(TabSegment, props);
  const classes = classnames(
    'tab-segment',
    className,
  );

  return (
    <Element
      {...rest}
      className={classes}
    >
      {children}
    </Element>
  );
}

TabSegment.defaultProps = {
  as: 'div',
  children: [],
  className: '',
};

TabSegment.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Main content
  children: PropTypes.node,

  // Additional classes
  className: PropTypes.string,
};
