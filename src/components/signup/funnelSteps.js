import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import bemify from '../../util/bemify';

const bem = bemify('funnel-steps');

const stepClass = bem('step');

export function BaseFunnelSteps({ currentOnboardingStepIndex, onboardingSteps }) {
  return (
    <div className={bem()}>
      {onboardingSteps.map((step, index) => (
        <Route
          key={step.path}
          path={step.path}
        >
          <div
            className={classnames(stepClass, 'text-nowrap', {
              [bem('step', 'active')]: currentOnboardingStepIndex === index,
              [bem('step', 'completed')]: currentOnboardingStepIndex > index,
            })}
          >
            {
              (currentOnboardingStepIndex <= index)
                ? <span className={bem('step-number')}>{index + 1}</span>
                : <img className={bem('step-number')} src="./assets/images/icon-check-white.svg" alt="" />
            }
            <span className={bem('step-text')}>{step.name}</span>
          </div>
        </Route>
      ))}
    </div>
  );
}

BaseFunnelSteps.propTypes = {
  currentOnboardingStepIndex: PropTypes.number.isRequired,
  onboardingSteps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ signup }) {
  return {
    currentOnboardingStepIndex: signup.currentStep.index,
    onboardingSteps: signup.steps.all,
  };
}

export default connect(mapStateToProps)(BaseFunnelSteps);
