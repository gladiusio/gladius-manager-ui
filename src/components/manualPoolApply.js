import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import bemify from '../util/bemify';
import Input from './input';

const bem = bemify('manual-pool-apply');

const PoolAddressField = ({ input, type, placeholder, wrapperClassName, className, meta: {touched, error } }) => (
  <div key="poolAddress-container-input" className={classnames(wrapperClassName, 'input form-group')}>
    <input
      key="poolAddress-input"
      className={classnames(className, 'form-control', {'is-invalid': touched && error})}
      {...input}
      placeholder={placeholder}
      type={type}
    />
    <div className="invalid-feedback">{error || ''}</div>
  </div>
);

class ManualPoolApply extends Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(values) {
    return this.props.onSubmit(values).catch(() => {
      throw new SubmissionError({
        poolAddress: 'Application failed. Are you sure the address is correct?'
      });
    });
  }

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
      <form onSubmit={handleSubmit(this.handleOnSubmit)} className={classnames(bem(), className)}>
        <Field
          name="poolAddress"
          component={PoolAddressField}
          placeholder={placeholder}
          wrapperClassName={classnames(bem('input'), inputClass)}
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
