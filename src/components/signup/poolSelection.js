import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import historyPropType from '../../propTypes/history';
import PoolTable from '../poolTable';
import bemify from '../../util/bemify';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { toggleSelectedPool, nextSignupStep, prevSignupStep } from '../../state/actions';
import { createApplications } from '../../state/account';

const bem = bemify('pool-selection');

export class BasePoolSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasClickedApply: false,
    };
    this.applyClick = this.applyClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.hasAppliedToPool && this.state.hasClickedApply) {
      this.props.history.push('/dashboard/home');
    }
  }

  applyClick(poolIds) {
    this.setState({hasClickedApply: true});
    this.props.applyToPools(this.props.poolIds);
  }

  render() {
    const props = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <h1 className={classnames(onboardingSecondaryHead, 'mt-5')}>
          Finally, select a pool to contribute
        </h1>
        <h2 className={classnames(onboardingSubhead, 'mb-5')}>
          You will contribute with your bandwidth, small amounts of storage, and processing power
        </h2>
        <PoolTable onRowClick={(poolId) => { props.selectPool(poolId); }} />
        <div className="d-flex flex-row justify-content-between">
          <a onClick={() => props.goToPrevStep()} className="btn btn-text btn-lg">
            Back
          </a>
          <button
            onClick={this.applyClick}
            disabled={!props.poolIds || props.loading}
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
  poolIds: [],
};

BasePoolSelection.propTypes = {
  poolIds: PropTypes.arrayOf(PropTypes.string),
  hasAppliedToPool: PropTypes.bool,
  goToNextStep: PropTypes.func,
  history: historyPropType,
};

function mapStateToProps(state) {
  return {
    poolIds: state.signup.poolIds,
    hasAppliedToPool: state.account.appliedToPool,
    loading: state.account.applyPoolLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
    applyToPools: (poolIds) => dispatch(createApplications(poolIds)),
    selectPool: (poolId) => dispatch(toggleSelectedPool(poolId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePoolSelection);
