import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import bemify from '../util/bemify';
import { onboardingField } from '../sharedClassNames';

const bem = bemify('passphraseForm');
// eslint-disable-next-line react/prop-types
class PassphraseField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible
    });
  }

  renderPassphraseInput() {
    let { input, meta: { touched, error } } = this.props;
    let type = "password";

    if (this.state.visible) {
      type = "text";
    }

    return [
      <input
        key="passphrase-input"
        {...input}
        className={classnames(bem('passphrase-field'), onboardingField, 'form-control form-control-lg', {
          'is-invalid': touched && error,
        })}
        placeholder="Passphrase"
        type={type}
      />,
      <div key="passphrase-error" className="invalid-feedback">
        {touched ? error : ''}
      </div>
    ];
  }

  render() {
    let { meta: { touched, error } } = this.props;
    return (
      <div key="passphrase" className={classnames(bem(), 'input form-group')}>
        <div className="passphrase-container">
          {this.renderPassphraseInput()}
          <img
            className="view-passphrase"
            src="/assets/images/icon-eye.svg"
            onClick={this.toggleVisibility}
          />
        </div>
      </div>
    );
  }
};

export default reduxForm({
  form: 'passphrase',
  validate: ({ passphrase }) => ({
    passphrase: passphrase ? undefined : 'Please enter a valid passphrase',
  }),
})(({
  handleSubmit,
  submitting,
  onSubmit,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={bem('passphrase')}>
    <div className="form-group">
      <label>Passphrase</label>
      <Field
        name="passphrase"
        type="password"
        label="Passphrase"
        component={PassphraseField}
      />
    </div>
  </form>
));
