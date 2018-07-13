import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAddress } from '../../state/account';
import MastheadContentSplit from '../mastheadContentSplit';
import Masthead from '../masthead';
import Card from '../card';
import CopyText from '../copyText';
import ExpectedUsage from '../expectedUsage';
import { createAccount } from '../../state/account';
import { addToast } from '../../state/toasts';
import { nextSignupStep, prevSignupStep } from '../../state/actions';
import { onboardingField, onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import bemify from '../../util/bemify';

const bem = bemify('confirmation-page');

export class BaseConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createAccountClicked: false,
    };

    this.nextClick = this.nextClick.bind(this);
    this.addedEtherClick = this.addedEtherClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.accountCreated && this.state.createAccountClicked) {
      this.props.goToNextStep();
    }
  }

  nextClick() {
    this.setState({createAccountClicked: true});
    if (!this.props.accountCreated) {
      this.props.createNode();
    }
  }

  addedEtherClick() {
    this.setState({addedEther: true});
  }

  renderLoading() {
    return (
      <div className="row justify-content-center">
        <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>
          Creating your new Node...
          <br/>
          This may take a while.
        </h1>
      </div>
    );
  }

  renderWalletAddress() {
    const {
      goToPrevStep,
      walletAddress
    } = this.props;

    return (
      <div>
        <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>
          Your new wallet's address is:
        </h1>
        <CopyText
          textareaClass={classnames(bem('wallet-address'))}
          className="row justify-content-center mb-5"
          value={walletAddress}
        >
        </CopyText>
        <h2 className={classnames(onboardingSubhead, 'mb-4')}>
          Please add Ether before continuing.
        </h2>
        <div className="row flex-column justify-content-center">
          <button
            className="btn btn-primary btn-chunky btn-lg mt-4 mb-2"
            onClick={this.addedEtherClick}
          >
            I have finished adding Ether
          </button>
          <div className="row justify-content-center">
            <a onClick={goToPrevStep} className="btn btn-text btn-lg">
              Back
            </a>
          </div>
        </div>
      </div>
    );
  }

  renderNodeCost() {
    return (
      <div className="row justify-content-center">
        <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>
          Once the creation of your Node begins, your wallet will be charged ETH.
        </h1>
        <button
          className="btn btn-primary btn-chunky btn-lg mt-4 mb-2"
          onClick={this.nextClick}
        >
          I am ready to create my Node
        </button>
      </div>
    );
  }

  renderConfirmStage() {
    if (this.state.addedEther) {
      return this.renderNodeCost();
    }

    return this.renderWalletAddress();
  }

  render() {
    const {
      accountLoading,
      goToPrevStep,
      walletAddress
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-7 mt-5')}>
        {accountLoading ? this.renderLoading() : this.renderConfirmStage()}
      </div>
    );
  }
}

BaseConfirmationPage.propTypes = {
  goToNextStep: PropTypes.func,
  goToPrevStep: PropTypes.func,
  createNode: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    walletAddress: state.wallet.walletAddress,
    accountCreated: state.account.accountCreated,
    accountLoading: state.account.accountCreationLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
    createNode: () => {
      dispatch(createAccount()).catch(() => {
        dispatch(addToast({
          text: 'There was a problem creating your account. Please try again later.',
          warning: true
        }));
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseConfirmationPage);
