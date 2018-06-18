import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import noop from '../util/noop';

const BaseExternalSubmitButton = ({ className, children, disabled, dispatchSubmit }) => (
  <button
    type="button"
    disabled={disabled}
    className={className}
    onClick={dispatchSubmit}
  >
    {children}
  </button>
)

BaseExternalSubmitButton.propTypes = {
  dispatchSubmit: PropTypes.func,
};


BaseExternalSubmitButton.defaultProps = {
  onSubmit: noop,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchSubmit: () => {
      ownProps.formIds.forEach((formId) => {
        dispatch(submit(formId));
      });

      // Necessary due to how external submit works for redux-form.
      // If the onSubmit fires and it changes page, it'll unregister
      // the form fields because the submit goes through.
      setTimeout(ownProps.onSubmit);
    },
  };
}

export default connect(null, mapDispatchToProps)(BaseExternalSubmitButton)
