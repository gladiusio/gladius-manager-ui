import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

import bemify from '../util/bemify';
import { onboardingField } from '../sharedClassNames';
import HiddenValueInput from './hiddenValueInput';

const bem = bemify('authenticateForm');

export default reduxForm({
  form: 'authentication',
  validate: ({ passphraseValue }) => ({
    passphraseValue: passphraseValue ? undefined : 'Please enter a valid passphrase'
  }),
  destroyOnUnmount: false,
})(({
  handleSubmit,
  submitting,
  onSubmit
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={classnames(bem(), 'form-group')}>
      <label>Passphrase</label>
      <Field
        name="passphraseValue"
        type="password"
        label="Passphrase"
        component={HiddenValueInput}
      />
    </div>
  </form>
));
