import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from './card';
import Table from './shared/table';
import bemify from '../util/bemify';

const bem = bemify('wallet-status-table');

const iconMap = {
  unlocked: 'status-active-big',
  locked: 'status-inactive-big',
};
const textMap = {
  unlocked: 'Unlocked',
  locked: 'Locked',
};

export default class WalletStatusTable extends Component {
  constructor(props) {
    super(props);
  }

  renderStatus(status) {
    const icon = iconMap[status];

    return (
      <Table.Cell>
        <img className="mr-2" src={`./assets/images/icon-${icon}.svg`} alt="" />
        {textMap[status]}
      </Table.Cell>
    );
  }

  getTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'wallet')}
            sorted="">
            Wallet
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'status')}
            sorted="">
            Status
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  getEmptyRow(walletStatus) {
    if (!walletStatus || walletStatus.length === 0) {
      return (
        <div className="text-center text-muted p-3">
          There are currently no statuses.
        </div>
      );
    }

    return null;
  }

  getTable(walletStatus) {
    return (
      <Table className="table">
        {this.getTableHeader()}
        <Table.Body>
          {this.getWalletStatusRow(walletStatus)}
        </Table.Body>
      </Table>
    );
  }

  getWalletStatusRow(walletStatus) {
    return (
      <Table.Row
        key={walletStatus.name}
      >
        <Table.Cell>
          <span>{walletStatus.name}</span>
        </Table.Cell>
        {this.renderStatus(walletStatus.status)}
      </Table.Row>
    );
  }

  render() {
    const {
      className,
      walletStatus,
    } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <Card noPadding>
          {this.getTable(walletStatus)}
          {this.getEmptyRow(walletStatus)}
        </Card>
      </div>
    );
  }
}

WalletStatusTable.defaultProps = {
  className: '',
  walletStatus: {},
};

WalletStatusTable.propTypes = {
  className: PropTypes.string,
  walletStatus: PropTypes.object,
};
