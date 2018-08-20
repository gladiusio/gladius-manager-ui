import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import bemify from '../util/bemify';
import TooltipWrapper from './tooltipWrapper';

const bem = bemify('wallet-balance');

export default class WalletBalance extends PureComponent {
  static propTypes = {
    processingBalance: PropTypes.shape({
      balance: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    walletBalance: PropTypes.number.isRequired,
  };

  static defaultProps = {
    processingBalance: null,
  };

  renderProcessingBalance() {
    const { processingBalance } = this.props;

    if (!processingBalance || (Number(processingBalance.balance) === 0)) {
      return null;
    }

    const tooltipContent = 'The transaction is being processed. Your balance will be available soon - check the payment status here.';
    return (
      <div className={bem('balance', 'bottom')}>
        <div className={bem('balance-bottom', 'header')}>
          <p>Processing Balance</p>
          <TooltipWrapper
            className={bem('balance', 'tooltip')}
            content={tooltipContent}
            tooltipStyle={{
              width: '242px',
              maxWidth: '242px',
              top: '-3.7rem',
              left: '-6.6rem',
            }}
          >
            <img src="./assets/images/icon-info.svg" alt="Info" />
          </TooltipWrapper>
        </div>
        <div className={bem('balance-bottom', 'content')}>
          <div className={bem('balance-bottom', 'processing')}>
            <p>{processingBalance.balance}</p>
          </div>
          <div className={bem('balance', 'gla')}>
            <p>GLA</p>
          </div>
          <div className={bem('balance', 'warning')}>
            <p>
              Transactions can take a few minutes to be
              visible on your Gladius balance
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderNoBalanceWarning() {
    return (
      <div className={bem('balance', 'warning')}>
        <p>
          You don&apos;t have GLA on your Gladius Balance. Transfer GLA from your
          MetaMask wallet to start using Gladius.
        </p>
      </div>
    );
  }

  renderLogo(symbol) {
    if (symbol === 'GLA') {
      return (
        <img src="./assets/images/icon-logo-small.svg" alt="Logo" />
      );
    }

    if (symbol === 'ETH') {
      return (
        <img src="./assets/images/icon-eth.png" alt="Logo" className="eth-icon" />
      );
    }

    return null;
  }

  renderBalance(title, balance, symbol) {
    return (
      <div className={classnames(bem('balance', 'top'), 'row justify-content-center flex-column')}>
        <span className={bem('balance-top', 'header')}>
          {this.renderLogo(symbol)}
          <p>{title}</p>
        </span>
        <span className={bem('balance-top', 'content')}>
          <div className={bem('balance-top', 'current')}>
            <p title={balance}>{balance}</p>
          </div>
          <div className={bem('balance', symbol)}>
            <p>{symbol}</p>
          </div>
        </span>
      </div>
    );
  }

  render() {
    let { glaBalance, ethBalance } = this.props;
    if (typeof glaBalance !== 'number') {
      glaBalance = '-';
    }
    if (typeof ethBalance !== 'number') {
      ethBalance = '_';
    }

    return (
      <div className={classnames(bem('balance'), 'row justify-content-around')}>
        {this.renderBalance('Gladius Balance', glaBalance, 'GLA')}
        {this.renderBalance('Ether Balance', ethBalance, 'ETH')}
        {this.renderProcessingBalance()}
      </div>
    );
  }
}
