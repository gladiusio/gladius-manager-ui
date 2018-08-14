import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import bemify from '../../util/bemify';
import { reduxFormField } from '../../util/fieldManager';
import FieldPropType from '../../propTypes/field';
import Select from '../select';
import Input from '../input';
import { onboardingSubhead, onboardingSecondaryHead } from '../../sharedClassNames';
import Tab from '../shared/tab';
import Card from '../card';
import WalletBalance from '../walletBalance';
import { formField } from '../../util/reduxForm';
import { walletActions } from '../../state/ducks/wallet';

const { fetchGLABalance } = walletActions;
const bem = bemify('manage-balance');

export class BaseManageBalance extends Component {
  componentWillMount() {
    this.props.fetchBalance();
  }

  renderWallets() {
    const { availableWallets, walletAddress } = this.props;
    if (!availableWallets.length) {
      return <span>No available wallet.</span>;
    }

    if (availableWallets.length === 1) {
      return (
        <Input className={classnames(bem('select'), 'px-3')} disabled value={availableWallets[0]} />
      );
    }

    return (
      <Select
        key="wallet"
        className={classnames(bem('select'), 'form-control')}
        errorMessage={walletAddress.errorMessage}
        {...reduxFormField(
          this,
          'walletAddress',
          () => {},
        )}
      >
        {availableWallets.map((wallet, i) => (
          <option key={wallet.address} value={wallet.address}>
            Wallet {i + 1} - {wallet.address}
          </option>
        ))}
      </Select>
    );
  }

  render() {
    const { walletBalance } = this.props;
    return (
      <div className="col-12 mt-5">
        <h1 className={classnames(bem(), onboardingSecondaryHead, 'balance-header mb-5')}>
          Manage your Gladius balance
        </h1>
        <div className="row">
          <div className="col-8">
            <Card>
              <div className="p-3">
                <div className={bem('wallet-withdraw')}>
                  <img src="./assets/images/icon-logo-small.svg" alt="Logo" />
                  <p className={bem('wallet-withdraw', 'gladius')}>Gladius Balance</p>
                  <p className={bem('wallet-withdraw', 'amount')}>{walletBalance} GLA</p>
                </div>
                <div className={bem('wallet-row')}>
                  <div className={bem('wallet-row', 'transfer')}>
                    <p>Withdraw</p><Input placeholder="e.g. 1000" />
                  </div>
                  <div className={bem('wallet-row', 'to')}>
                    <p>TO</p>
                    <img src="./assets/images/icon-arrow-big.svg" alt="Arrow" />
                  </div>
                  <div className={bem('wallet-withdraw', 'wallets')}>
                    {this.renderWallets()}
                  </div>
                </div>
                <div className={bem('wallet-button')}>
                  <button className="btn btn-primary btn-chunky btn-lg">Withdraw</button>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-4">
            <Card noPadding className={bem('balance')}>
              <WalletBalance
                processingBalance={this.props.processingBalance}
                walletBalance={this.props.walletBalance}
              />
            </Card>
          </div>
        </div>
        <div className={bem('progress-buttons')}>
          <div className={bem('progress-buttons', 'back')}>
            <Link
              to="/dashboard/settings"
              className="btn btn-text btn-lg"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

BaseManageBalance.propTypes = {
  availableWallets: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      balance: PropTypes.number,
    }),
  ).isRequired,
  processingBalance: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  walletAddress: FieldPropType.isRequired,
  walletBalance: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    availableWallets: [],
    walletAddress: formField(),
    walletBalance: state.wallet.glaBalance || 0,
    processingBalance: {balance: 0, type: 'gla'},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBalance: () => dispatch(fetchGLABalance()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseManageBalance);
