import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { setUserNodeData, setEmailAddressAndName } from '../../state/account';
import { setExpectedUsage } from '../../state/expectedUsage';
import { fetchGLABalance } from '../../state/wallet';

import Card from '../card';
import WalletBalance from '../walletBalance';
import EmailForm from '../emailForm';
import ExpectedUsage from '../expectedUsage';
import ExternalSubmitButton from '../externalSubmitButton';
import bemify from '../../util/bemify';

const bem = bemify('settings');

class BaseSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    this.props.fetchBalance();
  }

  onSave() {
    this.setState({loading: true});
    this.props.setNodeData().then(() => {
      this.setState({loading: false});
    }, () => {
      this.setState({loading: false});
    });
  }

  render() {
    const {
      setExpectedUsage,
      setEmailAddressAndName,
      setNodeData,
      glaBalance
    } = this.props;

    return (
      <div className={classnames(bem(), 'col-7 pt-5')}>
        <Card className="mb-4" title="Balance Information">
          <div className="row justify-content-between align-items-center">
            <div className="col-6">
              <WalletBalance walletBalance={glaBalance} />
            </div>
            <div className="col-sm-auto">
              <Link
                to="/dashboard/balance"
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
          <ExpectedUsage onSubmit={setExpectedUsage} />
        </Card>
        <div className="row flex-lg-row-reverse p-3">
          <ExternalSubmitButton
            formIds={['emailAddress', 'expectedUsage']}
            className="btn btn-primary btn-chunky btn-lg mt-2 mb-5"
            disabled={this.state.loading}
            onSubmit={this.onSave}
          >
            Save changes
          </ExternalSubmitButton>
        </div>
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
    setNodeData: () => {
      return dispatch(setUserNodeData());
    },
    fetchBalance: () => dispatch(fetchGLABalance())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseSettings);
