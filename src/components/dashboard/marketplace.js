import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { isValid } from 'redux-form';

import ComingSoon from '../comingSoon';
import Card from '../card';
import TooltipWrapper from '../tooltipWrapper';
import EmailForm from '../emailForm';
import ExpectedUsage from '../expectedUsage';
import IPAddressForm from '../ipAddressForm';
import ManualPoolApply from '../manualPoolApply';
import bemify from '../../util/bemify';
import noop from '../../util/noop';
import externalFormSubmit from '../../util/externalFormSubmit';
import PoolTable from '../poolTable';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { accountActions, accountSelectors } from '../../state/ducks/account';
import { expectedUsageActions, expectedUsageSelectors } from '../../state/ducks/expectedUsage';
import { signupActions } from '../../state/ducks/signup';
import {
  applicationsActions,
  applicationsSelectors
} from '../../state/ducks/applications';

const {
  getApplications,
} = applicationsActions;
const {
  createApplications,
  setEmailAddressAndName,
} = accountActions;
const { setExpectedUsage } = expectedUsageActions;
const { getExpectedUsage } = expectedUsageSelectors;
const { getFirstProfile } = applicationsSelectors;
const { toggleSelectedPool } = signupActions;
const { getApplyPoolLoading } = accountSelectors;
const bem = bemify('marketplace');

export class BaseMarketplace extends Component {
  constructor(props) {
    super(props);

    this.applyByTable = this.applyByTable.bind(this);
    this.applyManually = this.applyManually.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
    this.applicationRef = React.createRef();
  }

  componentWillMount() {
    this.props.getApplications();
    this.requestInterval = setInterval(() => {
      this.props.getApplications();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.requestInterval);
  }

  saveInfo() {
    return externalFormSubmit(
      this.props.dispatch,
      ['emailAddress', 'expectedUsage']
    );
  }

  applyByTable() {
    return this.saveInfo().then(() => {
      return this.props.applyToPools(this.props.poolIds);
    });
  }

  applyManually(poolIds) {
    return this.saveInfo().then(() => {
      return this.props.applyToPools(poolIds);
    });
  }

  render() {
    const {
      applyToPools,
      initialUsageValues,
      initialEmailValues,
      loading,
      poolIds,
      selectPool,
      setExpectedUsage,
      setEmailAddressAndName,
      validInfo
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <div className="row justify-content-center mb-4">
          <div className="col-9">
            <section key="pools">
              <h5 className={classnames(bem('pool-input-title'), 'mt-5 mb-3')}>
                If you have a pool address, paste it in and click 'Apply to Pool'.
              </h5>
              <TooltipWrapper
                className={classnames(bem('tooltip'), 'ml-2')}
                content="Please fill out your application information below first."
                disabled={validInfo}
                tooltipStyle={{
                  width: '242px',
                  maxWidth: '242px',
                  top: '-60px',
                  left: '60%',
                }}>
                <ManualPoolApply
                  className="row justify-content-start align-items-md-start mb-4 pl-3 pr-3"
                  inputClass={classnames(bem('pool-input'))}
                  disabled={loading || !validInfo}
                  onSubmit={(poolId) => this.applyManually([poolId.poolAddress]) }
                  placeholder="Pool address. Example: 0xDAcd582..."
                  buttonText="Apply to Pool"
                />
              </TooltipWrapper>
              <h5 className={classnames(bem('pool-input-title'), 'mt-5')}>
                Or, select a pool below.
              </h5>
              <PoolTable
                className="mt-3"
                onRowClick={(poolId) => { this.props.selectPool(poolId); }}
              />
              <div className="d-flex flex-row justify-content-center mb-5 mt-5">
                <button
                  onClick={() => this.applicationRef.current.scrollIntoView()}
                  className="btn btn-primary btn-chunky btn-lg"
                >
                  Next, confirm application information
                </button>
              </div>
            </section>
            <section key="application" ref={this.applicationRef} className={classnames(bem('application-section'))}>
              <h2 className={classnames(onboardingSecondaryHead, 'mb-2 text-center')}>
                Application Information
              </h2>
              <h5 className={classnames(onboardingSubhead, 'mb-5 text-center')}>
                We got this information from your previous application.<br/>
                If you update fields, your info will be saved after applying to another pool.
              </h5>
              <Card className="mb-4">
                <EmailForm
                  className="col-12"
                  showLabels
                  hideInfo
                  initialValues={initialEmailValues}
                  onSubmit={setEmailAddressAndName}
                />
                <ExpectedUsage
                  initialValues={initialUsageValues}
                  onSubmit={setExpectedUsage}
                />
              </Card>
            </section>
            <div key="bottom" className="fixed-bottom row justify-content-end pb-5 pr-5">
              <TooltipWrapper
                className={classnames(bem('tooltip'), 'ml-2')}
                content="Please fill out your application information."
                disabled={validInfo}
                tooltipStyle={{
                  width: '242px',
                  maxWidth: '242px',
                  top: '-50px',
                  left: '-6.6rem',
                }}>
                <button
                  onClick={this.applyByTable}
                  disabled={!poolIds.length || loading || !validInfo}
                  className="btn btn-primary btn-chunky btn-lg"
                >
                  Apply
                </button>
              </TooltipWrapper>
            </div>
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
  let { applications } = state;
  const firstProfile = getFirstProfile(applications);
  return {
    poolIds: state.signup.poolIds,
    loading: getApplyPoolLoading(state),
    validInfo: isValid('expectedUsage')(state) && isValid('emailAddress')(state),
    initialUsageValues: getExpectedUsage(firstProfile),
    initialEmailValues: firstProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applyToPools: (poolIds) => {
      return dispatch(createApplications(poolIds)).catch(noop);
    },
    setEmailAddressAndName: ({email, name}) => {
      dispatch(setEmailAddressAndName(email, name));
    },
    setExpectedUsage: (expectedUsage) => {
      dispatch(setExpectedUsage(expectedUsage));
    },
    selectPool: (poolId) => dispatch(toggleSelectedPool(poolId)),
    getApplications: () => dispatch(getApplications()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMarketplace);
