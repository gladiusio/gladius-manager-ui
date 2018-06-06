import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getElementType from '../../../util/getElementType';
import noop from '../../../util/noop';
import bemify from '../../../util/bemify';

const bem = bemify('toasts');

export default function Toast(props) {
  const {
    children,
    className,
    onDismiss,
    success,
    text,
    warning,
    ...rest
  } = props;
  const classes = classnames(
    className,
    bem('toast'),
    {
      success,
      warning,
    },
  );
  const Element = getElementType(Toast, props);

  return (
    <Element
      {...rest}
      className={classes}
      onClick={onDismiss}
    >
      {
        success ? <img src="/assets/images/icon-check-white.svg" alt="Success" /> : null
      }
      <p className={bem('content')}>{text}</p>
    </Element>
  );
}

Toast.defaultProps = {
  as: 'div',
  children: [],
  className: '',
  onDismiss: noop,
  success: false,
  text: '',
  warning: false,
};

Toast.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  success: PropTypes.bool,
  text: PropTypes.string,
  warning: PropTypes.bool,
};
