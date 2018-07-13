import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import GettingStarted from './signup/gettingStarted';
import GetSecure from './signup/getSecure';
import ConfirmationPage from './signup/confirmationPage';
import FunnelSteps from './signup/funnelSteps';
import PoolSelection from './signup/poolSelection';
import LockedRoute from './lockedRoute';
import MastheadContentSplit from './mastheadContentSplit';
import Masthead from './masthead';
import Toasts from './toasts';

export function BaseSignup({
  onboardingDone,
  currentOnboardingStepIndex,
  onboardingStepIndexByPath
}) {
  if (onboardingDone) {
    return <Redirect to="/dashboard/home" />;
  }

  return (
    <MastheadContentSplit
      masthead={
        <Masthead>
          <div className="row justify-content-between align-items-center">
            <div className="col">
              <FunnelSteps />
            </div>
          </div>
        </Masthead>
      }
    >
      <Toasts></Toasts>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <Switch>
            <Route exact path="/signup" render={() => <Redirect to="/signup/getting-started" />} />
            <LockedRoute
              path="/signup/getting-started"
              redirectTo="/signup/get-secure"
              component={GettingStarted}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
            <LockedRoute
              path="/signup/get-secure"
              redirectTo="/signup/confirmation"
              component={GetSecure}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
            <LockedRoute
              path="/signup/confirmation"
              redirectTo="/signup/choose-pool"
              component={ConfirmationPage}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
            <LockedRoute
              path="/signup/choose-pool"
              redirectTo="/signup"
              component={PoolSelection}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
          </Switch>
        </div>
      </div>
    </MastheadContentSplit>
  );
}

BaseSignup.propTypes = {
  currentOnboardingStepIndex: PropTypes.number.isRequired,
  onboardingStepIndexByPath: PropTypes.objectOf(PropTypes.number).isRequired,
};

function mapStateToProps({ account, signup }) {
  return {
    currentOnboardingStepIndex: signup.currentStep.index,
    onboardingStepIndexByPath: signup.steps.byPath,
    onboardingDone: !!account.nodeAddress && !!account.accountCreated,
  };
}

export default connect(mapStateToProps)(BaseSignup);
