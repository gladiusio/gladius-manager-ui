import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import ComingSoon from '../comingSoon';
import Card from '../card';
import EmailForm from '../emailForm';
import ExpectedUsage from '../expectedUsage';
import IPAddressForm from '../ipAddressForm';
import bemify from '../../util/bemify';
import externalFormSubmit from '../../util/externalFormSubmit';
import ManualPoolApply from '../manualPoolApply';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import {
  createApplications,
  setUserNodeData,
  setEmailAddressAndName,
  getNodeInfo,
} from '../../state/account';
import { setExpectedUsage } from '../../state/expectedUsage';

const bem = bemify('marketplace');

export class BaseMarketplace extends Component {
  constructor(props) {
    super(props);

    this.applyClick = this.applyClick.bind(this);
  }

  applyClick(poolIds) {
    return externalFormSubmit(
      this.props.dispatch,
      ['emailAddress', 'expectedUsage']
    ).then(() => {
      return this.props.applyToPools(poolIds);
    })
  }

  render() {
    const {
      loading,
      selectPool,
      setExpectedUsage,
      setEmailAddressAndName
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <div className="row justify-content-center mb-4">
          <div className="col-9">
            <h5 className={classnames(bem('pool-input-title'), 'mt-5')}>
              Paste in a pool address to apply to a pool.
            </h5>
            <ManualPoolApply
              className="row justify-content-start align-items-md-start mb-4 pl-3 pr-3"
              inputClass={classnames(bem('pool-input'))}
              disabled={loading}
              onSubmit={(poolId) => this.applyClick([poolId.poolAddress]) }
              placeholder="Pool address. Example: 0xDAcd582..."
              buttonText="Apply to Pool"
            />
            <h2 className={classnames(onboardingSecondaryHead, 'mb-2 text-center')}>
              Application Information
            </h2>
            <h5 className={classnames(onboardingSubhead, 'mb-4 text-center')}>
              This information was saved from a previous application.<br/>Change fields if they have changed.
            </h5>
            <Card className="mb-4">
              <EmailForm
                className="col-12"
                showLabels
                hideInfo
                onSubmit={setEmailAddressAndName}
              />
              <ExpectedUsage onSubmit={setExpectedUsage} />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

BaseMarketplace.defaultProps = {
  poolIds: [],
};

BaseMarketplace.propTypes = {
  poolIds: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps(state) {
  return {
    poolIds: state.signup.poolIds,
    loading: state.account.applyPoolLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applyToPools: (poolIds) => {
      return dispatch(createApplications(poolIds));
    },
    setEmailAddressAndName: ({email, name}) => {
      dispatch(setEmailAddressAndName(email, name));
    },
    setExpectedUsage: (expectedUsage) => {
      dispatch(setExpectedUsage(expectedUsage));
    },
    setNodeData: () => {
      return dispatch(setUserNodeData());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMarketplace);
