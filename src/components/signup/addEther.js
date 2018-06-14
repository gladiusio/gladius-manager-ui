import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAddress } from '../../state/account';
import MastheadContentSplit from '../mastheadContentSplit';
import Masthead from '../masthead';
import Card from '../card';
import ExpectedUsage from '../expectedUsage';
import { createAccount } from '../../state/account';
import { nextSignupStep, prevSignupStep } from '../../state/actions';
import { onboardingField, onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import bemify from '../../util/bemify';

const bem = bemify('addEther');

export class BaseAddEther extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createAccountClicked: false,
    };
    this.nextClick = this.nextClick.bind(this);
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

  render() {
    const {
      accountLoading,
      goToPrevStep,
      walletAddress
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-7 mt-5')}>
        <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>
          Your new wallet's address is: {walletAddress}
        </h1>
        <h2 className={classnames(onboardingSubhead, 'mb-4')}>
          Please add Ether before continuing.
        </h2>
        <div className="row flex-column justify-content-center">
          <button
            className="btn btn-primary btn-chunky btn-lg mt-4 mb-2"
            onClick={this.nextClick}
            disabled={accountLoading}
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
}

BaseAddEther.propTypes = {
  goToNextStep: PropTypes.func,
  goToPrevStep: PropTypes.func,
  createNode: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    walletAddress: state.account.walletAddress,
    accountCreated: state.account.accountCreated,
    accountLoading: state.account.accountCreationLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
    createNode: () => dispatch(createAccount()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseAddEther);
