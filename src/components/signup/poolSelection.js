import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PoolTable from '../poolTable';
import bemify from '../../util/bemify';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { choosePool, nextSignupStep, prevSignupStep } from '../../state/actions';

const bem = bemify('pool-selection');

export function BasePoolSelection(props) {
  return (
    <div className={classnames(bem(), 'col-10')}>
      <h1 className={classnames(onboardingSecondaryHead, 'mt-5')}>
        Content Distribution Network
      </h1>
      <h2 className={classnames(onboardingSubhead, 'mb-5')}>
        Select a pool that perfectly fits your price, location, and availability
      </h2>
      <PoolTable onRowClick={(poolId) => { props.dispatch(choosePool(poolId)); }} />
      <div className="d-flex flex-row justify-content-between">
        <a onClick={() => props.dispatch(prevSignupStep())} className="btn btn-text btn-lg">
          Back
        </a>
        <button
          onClick={() => console.log('done.')}
          disabled={!props.poolId}
          className="btn btn-primary btn-chunky btn-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

BasePoolSelection.defaultProps = {
  poolId: null,
};

BasePoolSelection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  poolId: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    poolId: state.signup.poolId,
  };
}

export default connect(mapStateToProps)(BasePoolSelection);
