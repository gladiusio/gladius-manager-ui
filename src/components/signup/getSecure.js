import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { isValid } from 'redux-form';
import PropTypes from 'prop-types';

import { accountActions, accountSelectors } from '../../state/ducks/account';
import { walletActions, walletSelectors } from '../../state/ducks/wallet';
import Card from '../card';
import PassphraseForm from '../passphraseForm';
import ExternalSubmitButton from '../externalSubmitButton';
import { toastActions } from '../../state/ducks/toasts';
import { signupActions, signupSelectors } from '../../state/ducks/signup';
import { authorizationActions } from '../../state/ducks/authorization';
import { onboardingField, onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import bemify from '../../util/bemify';

const { setPassphrase } = accountActions;
const { validatePassphrase } = accountSelectors;
const { createUserWallet } = walletActions;
const { getWalletLoading } = walletSelectors;
const { nextSignupStep, prevSignupStep, setWalletSuccess } = signupActions;
const { getAccount } = authorizationActions;
const { getWalletCreated } = signupSelectors;
const { addToast } = toastActions;
const bem = bemify('getSecure');

class BaseGetSecurePage extends Component {
  constructor(props) {
    super(props);

    this.passphraseForm = React.createRef();

    this.state = {
      continueClicked: false,
    };
    this.nextClick = this.nextClick.bind(this);
    this.onPassphraseSubmit = this.onPassphraseSubmit.bind(this);
  }

  componentWillMount() {
    this.props.resetWallet();
  }

  componentDidUpdate() {
    if (this.props.walletCreated && this.state.continueClicked) {
      this.props.goToNextStep();
    }
  }

  nextClick() {
    this.setState({continueClicked: true});
  }

  onPassphraseSubmit(passphrase) {
    this.props.setUserPassphrase(passphrase);
    this.nextClick();
  }

  render() {
    let {
      disabledContinue,
      goToNextStep,
      goToPrevStep,
      isLoading,
      setUserPassphrase,
      validForm
    } = this.props;

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
        <Card className="p-5 mb-5">
          <PassphraseForm
            onSubmit={this.onPassphraseSubmit}
            ref={this.passphraseForm}
          />
        </Card>
        <div className="fixed-bottom row justify-content-md-between p-3">
          <button
            className="btn btn-text btn-lg mt-2 mb-5 ml-5"
            onClick={goToPrevStep}
          >
            Back
          </button>
          <ExternalSubmitButton
            formIds={['passphrase']}
            className="btn btn-primary btn-chunky btn-lg mt-2 mb-5 mr-5"
            disabled={isLoading || !validForm}
            onSubmit={this.nextClick}
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

function mapStateToProps(state) {
  return {
    isLoading: getWalletLoading(state),
    walletCreated: getWalletCreated(state),
    validForm: isValid('passphrase')(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserPassphrase: (passphrase) => {
      dispatch(setPassphrase(passphrase));
      dispatch(createUserWallet()).catch((e) => {
        dispatch(addToast({
          text: 'There was a problem creating your wallet. Please try again.',
          warning: true
        }));
      }).then(() => {
        dispatch(getAccount());
      });
    },
    resetWallet: () => {
      dispatch(setWalletSuccess(false));
    },
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseGetSecurePage);
