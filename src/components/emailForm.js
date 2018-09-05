import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classnames from 'classnames';
import bemify from '../util/bemify';
import { onboardingField } from '../sharedClassNames';
import { isEmailAddress } from '../util/validators';

const bem = bemify('email');
// eslint-disable-next-line react/prop-types
const EmailField = ({ input, showLabel, type, meta: { touched, error } }) => (
  <div key="emailInputField" className="input form-group">
    { showLabel ? <label>Email address</label> : ''}
    <input
      key="emailInputField-input"
      {...input}
      placeholder="Email address"
      type={type}
      className={classnames(bem('email-field'), onboardingField, 'form-control form-control-lg', {
        'is-invalid': touched && error,
      })}
    />
    <div key="emailInputField-error" className="invalid-feedback">
      {touched ? error : ''}
    </div>
  </div>
);

// eslint-disable-next-line react/prop-types
const NameField = ({ input, showLabel, type, meta: { touched, error } }) => (
  <div key="nameInputField" className="input form-group">
    { showLabel ? <label>Name</label> : ''}
    <input
      key="nameInputField-input"
      {...input}
      placeholder="Name"
      type={type}
      className={classnames(bem('name-field'), onboardingField, 'form-control form-control-lg', {
        'is-invalid': touched && error,
      })}
    />
    <div key="nameInputField-error" className="invalid-feedback">
      {touched ? error : ''}
    </div>
  </div>
);


class BaseEmailForm extends Component {
  constructor(props) {
    super(props);
  }

  renderTitle() {
    if (this.props.hideInfo) {
      return null;
    }

    return (
      <h1 className="mb-3">Enter your name and email address.</h1>
    );
  }

  renderTos() {
    return (
      <p className={bem('tos-link')}>
        By signing up, you accept our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
      </p>
    );
  }

  renderSubmit() {
    const { hideInfo, submitting } = this.props;
    if (hideInfo) {
      return null;
    }

    return (
      <div className="text-center">
        <button type="submit" disabled={submitting} className="btn btn-primary btn-chunky btn-lg w-100 mb-4">
            Create account
        </button>
      </div>
    );
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      showLabels,
      hideInfo,
      className
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classnames(bem('email'), className)}
      >
        {this.renderTitle()}
        <div className="form-group">
          <Field
            name="name"
            type="text"
            showLabel={showLabels}
            component={NameField}
          />
          <Field
            name="email"
            type="text"
            showLabel={showLabels}
            component={EmailField}
          />
        </div>
        {this.renderSubmit()}
      </form>
    );
  }
}

BaseEmailForm = reduxForm({
  form: 'emailAddress',
  validate: ({ email, name }) => ({
    email: isEmailAddress(email) ? undefined : 'Please enter a valid email',
    name: name ? undefined : 'Please enter a valid name',
  }),
})(BaseEmailForm);

function mapStateToProps(state, ownProps) {
  let { account } = state;

  return {
    initialValues: Object.assign(account, ownProps.initialValues),
    className: ownProps.className,
  };
}

BaseEmailForm = connect(
  mapStateToProps
)(BaseEmailForm);

export default BaseEmailForm;
