import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { accountActions } from '../../state/ducks/account';
import MastheadContentSplit from '../mastheadContentSplit';
import Masthead from '../masthead';
import Card from '../card';
import ExternalSubmitButton from '../externalSubmitButton';
import ExpectedUsage from '../expectedUsage';
import { expectedUsageActions } from '../../state/ducks/expectedUsage';
import { expectedUsageSelectors } from '../../state/ducks/expectedUsage';
import { signupActions } from '../../state/ducks/signup';
import { onboardingField, onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import bemify from '../../util/bemify';

const { setEmailAddress } = accountActions;
const { setExpectedUsage } = expectedUsageActions;
const { validExpectedUsage } = expectedUsageSelectors;
const { nextSignupStep } = signupActions;
const bem = bemify('gettingStarted');

export function BaseGettingStarted({ disabledContinue, goToNextStep, setExpectedUsage }) {
  return (
    <div className={classnames(bem(), 'col-7 mt-5')}>
      <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>Get started with Gladius</h1>
      <h2 className={classnames(onboardingSubhead, 'mb-4')}>Let us know your expected usage so we can estimate your monthly earnings</h2>
      <div className="row justify-content-center">
        <div className="col-12 justify-content-center mb-5">
          <Card className="p-5 mb-5">
            <ExpectedUsage onSubmit={setExpectedUsage}></ExpectedUsage>
          </Card>
        </div>
        <div className="fixed-bottom row justify-content-end">
          <ExternalSubmitButton
            className="btn btn-primary btn-chunky btn-lg mt-4 mb-5 mr-5"
            // disabled={disabledContinue}
            onSubmit={goToNextStep}
            formIds={['expectedUsage']}
          >
            Continue
          </ExternalSubmitButton>
        </div>
      </div>
    </div>
  );
}

BaseGettingStarted.propTypes = {
  disabledContinue: PropTypes.bool,
  goToNextStep: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    disabledContinue: !validExpectedUsage(state.expectedUsage),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToNextStep: () => dispatch(nextSignupStep()),
    setExpectedUsage: (expectedUsage) => {
      dispatch(setExpectedUsage(expectedUsage));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseGettingStarted);
