import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import bemify from '../util/bemify';
import Input from './input';

const bem = bemify('manual-pool-apply');

const PoolAddressField = ({ input, type, placeholder, wrapperClassName, className, meta: {error } }) => (
  <div key="poolAddress-container-input" className={classnames(wrapperClassName, 'input form-group')}>
    <input
      key="poolAddress-input"
      className={classnames(className, 'form-control')}
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {error && <span className="invalid-feedback">{error}</span>}
  </div>
);

class ManualPoolApply extends Component {
  render() {
    const {
      className,
      onSubmit,
      inputClass,
      buttonText,
      placeholder,
      disabled,
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit((values) => { return onSubmit(values).catch(() => {
        throw new SubmissionError({poolAddress: 'Application failed!'})
      })})} className={classnames(bem(), className)}>
        <Field
          name="poolAddress"
          component={PoolAddressField}
          placeholder={placeholder}
          wrapperClassName={classnames(bem('input'), inputClass)}
          className="m-0"
        />
        <button
          className={classnames(bem('submit'), 'btn btn-secondary ml-2')}
          type="submit"
          disabled={disabled}
        >
          {buttonText}
        </button>
      </form>
    );
  }
}

ManualPoolApply.defaultProps = {
  className: '',
  inputClass: '',
  onSubmit: () => {},
  disabled: false,
  buttonText: 'Submit',
  placeholder: '',
};

ManualPoolApply.propTypes = {
  className: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};


export default reduxForm({
  form: 'manualPoolApply',
})(ManualPoolApply);
