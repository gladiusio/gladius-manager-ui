import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { submit } from 'redux-form';

import { accountActions } from '../../state/ducks/account';
import { expectedUsageActions } from '../../state/ducks/expectedUsage';
import { walletActions } from '../../state/ducks/wallet';
import { toastActions } from '../../state/ducks/toasts';
import Card from '../card';
import IPAddressForm from '../ipAddressForm';
import TypeToConfirmModal from '../typeToConfirmModal';
import WalletBalance from '../walletBalance';
import EmailForm from '../emailForm';
import ExpectedUsage from '../expectedUsage';
import ExternalSubmitButton from '../externalSubmitButton';
import bemify from '../../util/bemify';
import externalFormSubmit from '../../util/externalFormSubmit';

const {
  setUserNodeData,
  setEmailAddressAndName,
  setIPAddress,
  getNodeInfo,
} = accountActions;
const { fetchGLABalance } = walletActions;
const { setExpectedUsage } = expectedUsageActions;
const { addToast } = toastActions;
const bem = bemify('settings');

class BaseSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isShowingConfirm: false,
    };

    this.onSave = this.onSave.bind(this);
    this.submitAllForms = this.submitAllForms.bind(this);
  }

  componentWillMount() {
    this.props.fetchBalance();
  }

  onSave() {
    this.submitAllForms().then(() => {
      this.setState({loading: true});
      this.props.setNodeData().then(() => {
        this.props.dispatch(getNodeInfo());
        this.setState({loading: false, isShowingConfirm: false});
      }, () => {
        this.props.dispatch(addToast({
          text: 'There was a problem saving your settings. Please try again later.',
          warning: true
        }));
        this.setState({loading: false, isShowingConfirm: false});
      });
    })

  }

  submitAllForms() {
    return externalFormSubmit(
      this.props.dispatch,
      ['emailAddress', 'expectedUsage', 'ipAddress']
    );
  }

  renderConfirmationModal() {
    if (!this.state.isShowingConfirm) {
      return null;
    }

    return (
      <TypeToConfirmModal
        action={this.onSave}
        actionName="I want to change Settings"
        content={(
          <Fragment>
            This action will trigger a blockchain transaction which will cost 1 GLA.
          </Fragment>
        )}
        confirmString="I want to change"
        disabled={this.state.loading}
        onClose={() => this.setState({isShowingConfirm: false})}
        title="Change Settings"
      />
    );
  }

  render() {
    const {
      setExpectedUsage,
      setEmailAddressAndName,
      setIPAddress,
      setNodeData,
      glaBalance
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-8 pt-5')}>
        <Card className="mb-4" title="Balance Information">
          <div className="row justify-content-between align-items-center">
            <div className="col-6">
              <WalletBalance walletBalance={glaBalance} />
            </div>
            <div className="col-sm-auto">
              <Link
                to="/dashboard/settings/balance"
                className="btn-alternate btn-alternate--inverse m-4"
              >
                Manage your balance
              </Link>
            </div>
          </div>
        </Card>
        <Card className="mb-4" title="Personal Information">
          <EmailForm
            showLabels
            hideInfo
            onSubmit={setEmailAddressAndName}
          />
        </Card>
        <Card title="Node Information">
          <IPAddressForm className="col-12" onSubmit={setIPAddress} />
          <ExpectedUsage onSubmit={setExpectedUsage} />
        </Card>
        <div className="row flex-lg-row-reverse p-3">
          <button
            className="btn btn-primary btn-chunky btn-lg mt-2 mb-5"
            disabled={this.state.loading}
            onClick={() => this.setState({isShowingConfirm: true})}
          >
            Save changes
          </button>
        </div>
        {this.renderConfirmationModal()}
      </div>
    );
  }
}

BaseSettings.propTypes = {
  setExpectedUsage: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    glaBalance: state.wallet.glaBalance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEmailAddressAndName: ({email, name}) => {
      dispatch(setEmailAddressAndName(email, name));
    },
    setExpectedUsage: (expectedUsage) => {
      dispatch(setExpectedUsage(expectedUsage));
    },
    setIPAddress: (ip) => {
      dispatch(setIPAddress(ip));
    },
    setNodeData: () => {
      return dispatch(setUserNodeData());
    },
    fetchBalance: () => dispatch(fetchGLABalance()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseSettings);
