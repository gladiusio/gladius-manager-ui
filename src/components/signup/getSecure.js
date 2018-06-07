import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setPassphrase, validatePassphrase } from '../../state/account';
import Card from '../card';
import ExpectedUsage from '../expectedUsage';
import PassphraseForm from '../passphraseForm';
import ExternalSubmitButton from '../externalSubmitButton';
import { validExpectedUsage } from '../../state/expectedUsage';
import { nextSignupStep, prevSignupStep } from '../../state/actions';
import { onboardingField, onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import bemify from '../../util/bemify';

const bem = bemify('getSecure');

class BaseGetSecurePage extends Component {
  constructor(props) {
    super(props);

    this.passphraseForm = React.createRef();
    this.onPassphraseChange = this.onPassphraseChange.bind(this);

    this.state = {
      validForm: false
    };
  }

  onPassphraseChange(passphraseForm) {
    this.setState({
      validForm: validatePassphrase(passphraseForm)
    });
  }

  render() {
    let { disabledContinue, goToNextStep, goToPrevStep, setUserPassphrase } = this.props;
    return (
      <div className={classnames(bem(), 'col-7 mt-5')}>
        <div className="row justify-content-center">
          <div className="mr-2 pl-3">
            <img
              className="view-passphrase"
              src="./assets/images/icon-security.svg"
            />
          </div>
          <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>
            Let's get secure
          </h1>
        </div>
        <h2 className={classnames(onboardingSubhead, 'mb-4')}>We'll use the following details to encrypt your data on the blockchain and allow you to be identified</h2>
        <Card className="p-5">
          <PassphraseForm
            onSubmit={setUserPassphrase}
            onChange={this.onPassphraseChange}
            ref={this.passphraseForm}
          />
        </Card>
        <div className="row justify-content-md-between p-3">
          <button
            className="btn btn-text btn-lg mt-2 mb-5"
            onClick={goToPrevStep}
          >
            Back
          </button>
          <ExternalSubmitButton
            formIds={['passphrase']}
            className="btn btn-primary btn-chunky btn-lg mt-2 mb-5"
            onSubmit={goToNextStep}
            disabled={!this.state.validForm}
          >
            Continue
          </ExternalSubmitButton>
        </div>
      </div>
    );
  }
}

BaseGetSecurePage.propTypes = {
  disabledContinue: PropTypes.bool,
  setUserPassphrase: PropTypes.func,
  goToNextStep: PropTypes.func,
  goToPrevStep: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    setUserPassphrase: passphrase => dispatch(setPassphrase(passphrase)),
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
  };
}

export default connect(null, mapDispatchToProps)(BaseGetSecurePage);
