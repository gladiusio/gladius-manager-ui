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
import { walletActions } from '../../state/ducks/wallet';

const { fetchGLABalance } = walletActions;
const bem = bemify('wallet-page');

class BaseTransactions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchBalance();
  }

  render() {
    const { glaBalance, walletAddress } = this.props;
    return (
      <div className={classnames(bem(), 'col-10 pt-5')}>
        <div className="row justify-content-between">
          <div className="col-6 p-0 pr-3">
            <Card className="mb-2" title="Balance Information">
              <div>
                <WalletBalance walletBalance={glaBalance} />
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
};

function mapStateToProps(state) {
  return {
    glaBalance: state.wallet.glaBalance,
    walletAddress: state.wallet.walletAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBalance: () => dispatch(fetchGLABalance()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseTransactions);
