import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import bemify from '../util/bemify';
import { onboardingField } from '../sharedClassNames';
import { isEmailAddress } from '../util/validators';

const bem = bemify('home');
// eslint-disable-next-line react/prop-types
const EmailField = ({ input, type, meta: { touched, error } }) => (
  <div key="emailInputField" className="input form-group">
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
const NameField = ({ input, type, meta: { touched, error } }) => (
  <div key="nameInputField" className="input form-group">
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

export default reduxForm({
  form: 'emailAddress',
  validate: ({ email, name }) => ({
    email: isEmailAddress(email) ? undefined : 'Please enter a valid email',
    name: name ? undefined : 'Please enter a valid name',
  }),
})(({
  handleSubmit,
  submitting,
  onSubmit,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={bem('email')}>
    <h1 className="mb-3">Enter your name and email address.</h1>
    <div className="form-group">
      <Field
        name="name"
        type="text"
        component={NameField}
      />
      <Field
        name="email"
        type="text"
        component={EmailField}
      />
    </div>
    <div className="text-center">
      <button type="submit" disabled={submitting} className="btn btn-primary btn-chunky btn-lg w-100 mb-4">
          Create account
      </button>
      <p className={bem('tos-link')}>
          By signing up, you accept our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
      </p>
    </div>
  </form>
));
