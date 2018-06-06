import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAddress } from '../../state/account';
import MastheadContentSplit from '../mastheadContentSplit';
import Masthead from '../masthead';
import Card from '../card';
import ExpectedUsage from '../expectedUsage';
import { validExpectedUsage } from '../../state/expectedUsage';
import { nextSignupStep } from '../../state/actions';
import { onboardingField, onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import bemify from '../../util/bemify';

const bem = bemify('gettingStarted');

export function BaseGettingStarted({ disabledContinue, goToNextStep }) {
  return (
    <div className={classnames(bem(), 'col-7 mt-5')}>
      <h1 className={classnames(onboardingSecondaryHead, 'mb-3')}>Get started with Gladius</h1>
      <h2 className={classnames(onboardingSubhead, 'mb-4')}>Let us know your expected usage so we can estimate your monthly earnings</h2>
      <div className="row justify-content-center">
        <div className="col-12 justify-content-center">
          <Card className="p-5">
            <ExpectedUsage></ExpectedUsage>
          </Card>
        </div>
        <button
          className="btn btn-primary btn-chunky btn-lg mt-4 mb-5"
          disabled={disabledContinue}
          onClick={goToNextStep}
        >
          Continue
        </button>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseGettingStarted);
