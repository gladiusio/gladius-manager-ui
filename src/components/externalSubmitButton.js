import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import noop from '../util/noop';
import externalFormSubmit from '../util/externalFormSubmit';

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
      externalFormSubmit(dispatch, ownProps.formIds).then(() => {
        ownProps.onSubmit();
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(BaseExternalSubmitButton)
