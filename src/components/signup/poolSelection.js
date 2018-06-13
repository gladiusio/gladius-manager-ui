import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PoolTable from '../poolTable';
import bemify from '../../util/bemify';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { choosePool, nextSignupStep, prevSignupStep } from '../../state/actions';
import { createApplication } from '../../state/account';

const bem = bemify('pool-selection');

export class BasePoolSelection extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasAppliedToPool) {
      console.log('going to next step!');
      // nextProps.goToNextStep();
    }
  }

  render() {
    const props = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <h1 className={classnames(onboardingSecondaryHead, 'mt-5')}>
          Content Distribution Network
        </h1>
        <h2 className={classnames(onboardingSubhead, 'mb-5')}>
          Select a pool that perfectly fits your price, location, and availability
        </h2>
        <PoolTable onRowClick={(poolId) => { props.choosePool(poolId); }} />
        <div className="d-flex flex-row justify-content-between">
          <a onClick={() => props.goToPrevStep()} className="btn btn-text btn-lg">
            Back
          </a>
          <button
            onClick={() => console.log('done.')}
            disabled={!props.poolId || props.loading}
            className="btn btn-primary btn-chunky btn-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
}

BasePoolSelection.defaultProps = {
  poolId: null,
};

BasePoolSelection.propTypes = {
  poolId: PropTypes.string,
  hasAppliedToPool: PropTypes.bool,
  goToNextStep: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    poolId: state.signup.poolId,
    hasAppliedToPool: state.account.appliedToPool,
    loading: state.account.applyPoolLoading,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
    applyToPool: (poolId) => dispatch(createApplication(poolId)),
    selectPool: (poolId) => dispatch(choosePool(poolId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePoolSelection);
