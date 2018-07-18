import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { removeToast } from '../state/toasts';
import Toast from './shared/toast';
import toastPropType from '../propTypes/toast';

export function BaseToasts(props) {
  const {
    className,
    unsetToast,
    toasts,
    ...rest
  } = props;
  const classes = classnames(
    className,
    'toasts',
  );

  return (
    toasts.length
      ?
        <div
          {...rest}
          className={classes}
        >
          {
            toasts.map(toast => (
              <Toast
                {...toast}
                key={toast.text}
                onDismiss={() => unsetToast(toast.text)}
              />
            ))
          }
        </div>
      : null
  );
}

BaseToasts.defaultProps = {
  className: 'toasts',
};

BaseToasts.propTypes = {
  className: PropTypes.string,
  unsetToast: PropTypes.func.isRequired,
  toasts: PropTypes.arrayOf(toastPropType).isRequired,
};

function mapStateToProps(state) {
  return {
    toasts: state.toasts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    unsetToast: id => dispatch(removeToast(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseToasts);
