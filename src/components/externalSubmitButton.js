import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchSubmit: () => {
      ownProps.formIds.forEach((formId) => {
        dispatch(submit(formId));
      });
      ownProps.onSubmit();
    },
  };
}


export default connect(null, mapDispatchToProps)(BaseExternalSubmitButton)
