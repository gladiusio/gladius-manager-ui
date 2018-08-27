import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import historyPropType from '../../propTypes/history';
import PoolTable from '../poolTable';
import ComingSoon from '../comingSoon';
import ManualPoolApply from '../manualPoolApply';
import bemify from '../../util/bemify';
import noop from '../../util/noop';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { signupActions } from '../../state/ducks/signup';
import { accountActions } from '../../state/ducks/account';

const { createApplications } = accountActions;
const { toggleSelectedPool, nextSignupStep, prevSignupStep } = signupActions;
const bem = bemify('pool-selection');

export class BasePoolSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasClickedApply: false,
    };
    this.applyByTable = this.applyByTable.bind(this);
    this.applyManually = this.applyManually.bind(this);
  }

  componentDidUpdate() {
    if (this.props.hasAppliedToPool && this.state.hasClickedApply) {
      this.props.history.push('/dashboard/home');
    }
  }

  applyByTable() {
    this.setState({hasClickedApply: true});
    return this.props.applyToPools(this.props.poolIds);
  }

  applyManually(poolIds) {
    this.setState({hasClickedApply: true});
    return this.props.applyToPools(poolIds);
  }

  render() {
    const props = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <h1 className={classnames(onboardingSecondaryHead, bem('pool-input-title'), 'mt-5')}>
          Paste in a pool address to apply to a pool.
        </h1>
        <div className="row justify-content-start align-items-lg-start pl-3">
          <ManualPoolApply
            className="row justify-content-start align-items-md-start mb-4 pl-3 pr-3"
            inputClass={classnames(bem('pool-input'))}
            disabled={props.loading}
            onSubmit={(poolId) => this.applyManually([poolId.poolAddress]) }
            placeholder="Pool address. Example: 0xDAcd582..."
            buttonText="Apply to Pool"
          />
          <Link
            to="/dashboard/home"
            className="btn btn-text btn-md mt-2 ml-3"
          >
            Skip this step
          </Link>
        </div>
        <h1 className={classnames(onboardingSecondaryHead, 'mt-5')}>
          Or, choose a pool you wish to join
        </h1>
        <h2 className={classnames(onboardingSubhead, 'mb-5')}>
          You will contribute with your bandwidth, small amounts of storage, and processing power
        </h2>
        <PoolTable
          className="mb-4"
          onRowClick={(poolId) => { props.selectPool(poolId); }}
        />
        <div className="d-flex flex-row justify-content-end">
          <button
            onClick={this.applyByTable}
            disabled={!props.poolIds.length || props.loading}
            className="btn btn-primary btn-chunky btn-lg"
          >
            Apply
          </button>
          <Link
            to="/dashboard/home"
            className="btn btn-text btn-md mt-2 ml-3"
          >
            Skip this step
          </Link>
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
    hasAppliedToPool: state.signup.appliedToPool,
    loading: state.account.applyPoolLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToNextStep: () => dispatch(nextSignupStep()),
    goToPrevStep: () => dispatch(prevSignupStep()),
    applyToPools: (poolIds) => dispatch(createApplications(poolIds)).catch(noop),
    selectPool: (poolId) => dispatch(toggleSelectedPool(poolId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePoolSelection);
