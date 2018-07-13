import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
            <img src="/assets/images/icon-info.svg" alt="Info" />
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

  render() {
    const { walletBalance } = this.props;
    return (
      <div className={bem('balance')}>
        <div className={bem('balance', 'top')}>
          <div className={bem('balance-top', 'header')}>
            <img src="/assets/images/icon-logo-small.svg" alt="Logo" />
            <p>Gladius Balance</p>
          </div>
          <div className={bem('balance-top', 'content')}>
            <div className={bem('balance-top', 'current')}>
              <p>{walletBalance}</p>
            </div>
            <div className={bem('balance', 'gla')}>
              <p>GLA</p>
            </div>
            {
              Number(walletBalance) === 0
                ? (
                  <div className={bem('balance', 'warning')}>
                    <p>
                      You don&apos;t have GLA on your Gladius Balance. Transfer GLA from your
                      MetaMask wallet to start using Gladius.
                    </p>
                  </div>
                )
                : null
            }
          </div>
        </div>
        {this.renderProcessingBalance()}
      </div>
    );
  }
}
