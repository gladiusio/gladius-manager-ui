import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import bemify from '../util/bemify';
import { onboardingField } from '../sharedClassNames';

const bem = bemify('hiddenValueInput');

// eslint-disable-next-line react/prop-types
export default class HiddenValueInput extends Component {
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

  renderInput() {
    let { input, meta: { touched, error } } = this.props;
    let type = "password";

    if (this.state.visible) {
      type = "text";
    }

    return [
      <input
        key="value-input"
        {...input}
        className={classnames(bem('value-field'), onboardingField, 'form-control form-control-lg', {
          'is-invalid': touched && error,
        })}
        placeholder="Passphrase"
        type={type}
      />,
      <div key="value-error" className="invalid-feedback">
        {touched ? error : ''}
      </div>
    ];
  }

  render() {
    let { meta: { touched, error } } = this.props;
    return (
      <div key="value" className={classnames(bem(), 'input form-group')}>
        <div className="value-container">
          {this.renderInput()}
          <img
            className="view-value"
            src="./assets/images/icon-eye.svg"
            onClick={this.toggleVisibility}
          />
        </div>
      </div>
    );
  }
};
