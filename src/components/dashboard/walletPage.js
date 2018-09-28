import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TransactionsTable from '../transactionsTable';
import Card from '../card';
import WalletBalance from '../walletBalance';
import CopyText from '../copyText';
import bemify from '../../util/bemify';
import { startPoll, endPoll } from '../../util/polling';
import { walletActions, walletSelectors } from '../../state/ducks/wallet';

const { fetchGLABalance, fetchETHBalance } = walletActions;
const { getGlaBalance, getEthBalance, getWalletAddress } = walletSelectors;
const bem = bemify('wallet-page');

class BaseTransactions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    startPoll('fetchBalance', this.props.fetchBalance, 4000);
  }

  componentWillUnmount() {
    endPoll('fetchBalance');
  }

  render() {
    const { glaBalance, ethBalance, walletAddress } = this.props;
    return (
      <div className={classnames(bem(), 'col-10 pt-5')}>
        <div className="row justify-content-between">
          <div className="col-6 p-0 pr-3">
            <Card className="mb-2" title="Balance Information">
              <div>
                <WalletBalance glaBalance={glaBalance} ethBalance={ethBalance} />
              </div>
            </Card>
          </div>
          <div className="col-6 p-0 pl-3">
            <Card
              className="mb-2"
              title="Wallet Address"
            >
              <CopyText
                textareaClass={classnames(bem('wallet-address'))}
                className="row flex-column justify-content-center p-3"
                buttonClass="mt-2"
                value={walletAddress}
              >
              </CopyText>
            </Card>
          </div>
        </div>
        <div className="row justify-content-between">
          <TransactionsTable />
        </div>
      </div>
    );
  }
}

BaseTransactions.propTypes = {
  glaBalance: PropTypes.number,
  ethBalance: PropTypes.number,
  walletAddress: PropTypes.string,
  fetchBalance: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    glaBalance: getGlaBalance(state),
    ethBalance: getEthBalance(state),
    walletAddress: getWalletAddress(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBalance: () => {
      dispatch(fetchGLABalance());
      dispatch(fetchETHBalance());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseTransactions);
