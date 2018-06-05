import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import bemify from '../util/bemify';
import { onboardingField } from '../sharedClassNames';
import HiddenValueInput from './hiddenValueInput';

const bem = bemify('passphraseForm');

export default reduxForm({
  form: 'passphrase',
  validate: ({ passphraseValue, passphraseConfirmation }) => ({
    passphraseValue: passphraseValue ? undefined : 'Please enter a valid passphrase',
    passphraseConfirmation: passphraseConfirmation === passphraseValue ? undefined : 'The passphrases do not match',
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
      <div className="mb-3">
        <span className="text-muted sub-text">Create a passphrase for your wallet. <strong>Make sure to store your passphrase somewhere safe. We will not be able to help you regain it if you lose it.</strong></span>
      </div>
      <Field
        name="passphraseValue"
        type="password"
        label="Passphrase"
        component={HiddenValueInput}
      />
      <label>Passphrase Confirmation</label>
      <Field
        name="passphraseConfirmation"
        type="password"
        label="Passphrase Confirmation"
        component={HiddenValueInput}
      />
    </div>
  </form>
));
