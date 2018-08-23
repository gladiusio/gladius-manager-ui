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
import PoolTable from '../poolTable';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { accountActions } from '../../state/ducks/account';
import { expectedUsageActions } from '../../state/ducks/expectedUsage';
import { signupActions } from '../../state/ducks/signup';

const {
  createApplications,
  setUserNodeData,
  setEmailAddressAndName,
  getNodeInfo,
} = accountActions;
const { setExpectedUsage } = expectedUsageActions;
const { toggleSelectedPool } = signupActions;
const bem = bemify('marketplace');

export class BaseMarketplace extends Component {
  constructor(props) {
    super(props);

    this.applyClick = this.applyClick.bind(this);
  }

  applyClick() {
    return externalFormSubmit(
      this.props.dispatch,
      ['emailAddress', 'expectedUsage']
    ).then(() => {
      return this.props.applyToPools(this.props.poolIds);
    }).catch((err) => {
      console.log('WHAT', err);
    });
  }

  render() {
    const {
      applyToPools,
      loading,
      poolIds,
      selectPool,
      setExpectedUsage,
      setEmailAddressAndName
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <div className="row justify-content-center mb-4">
          <div className="col-9">
            <section>
              <PoolTable
                className="mt-5"
                onRowClick={(poolId) => { this.props.selectPool(poolId); }}
              />
              <div className="d-flex flex-row justify-content-end mb-5 mt-3">
                <button
                  onClick={this.applyClick}
                  disabled={!poolIds.length || loading}
                  className="btn btn-primary btn-chunky btn-lg"
                >
                  Apply
                </button>
              </div>
            </section>
            <section className={classnames(bem('application-section'), 'pt-5')}>
              <h2 className={classnames(onboardingSecondaryHead, 'mb-2 text-center')}>
                Application Information
              </h2>
              <h5 className={classnames(onboardingSubhead, 'mb-5 text-center')}>
                This info was saved from a previous application.<br/>
                If you update fields, your info will be saved after applying to another pool.
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
            </section>
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
    selectPool: (poolId) => dispatch(toggleSelectedPool(poolId)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMarketplace);
