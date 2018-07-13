import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Card from './card';
import Table from './shared/table';
import Tooltip from './shared/tooltip/tooltip';
import FakeDropdown from './fakeDropdown';
import {
  getAllTransactions,
  setFilterType,
} from '../state/transactions';
import transactionTypes from '../util/transactionTypes';
import bemify from '../util/bemify';

const bem = bemify('transactions-table');

export class BaseTransactionsTable extends Component {
  constructor(props) {
    super(props);
    this.renderTransactionTypes = this.renderTransactionTypes.bind(this);
  }

  componentWillMount() {
    this.props.getAllTransactions();
  }

  onFilterClick(close, type) {
    close();
    this.props.setFilterType(type);
  }

  renderType(type) {
    let text = '—';
    let transactionType = transactionTypes.find((t) => t.type === type);
    if (transactionType) {
      text = transactionType.display;
    }

    return (
      <span className={classnames(bem('type'), type)}>
        {text}
      </span>
    );
  }

  renderTransactionTypes(close) {
    const { setFilterType, typeFilter } = this.props;
    const onClick = this.onFilterClick.bind(this, close);

    return (
      <div className="time-tooltip-content">
        <div
          className={classnames({highlighted: !typeFilter}, 'time-tooltip-item')}
          onClick={() => onClick('')}>
          All
        </div>
        {
          transactionTypes.map((transactionType) => {
            return (
              <div
                className={
                  classnames({
                    highlighted: typeFilter === transactionType.type
                  }, 'time-tooltip-item')
                }
                onClick={() => onClick(transactionType.type)}>
                {transactionType.display}
              </div>
            );
          })
        }
      </div>
    );
  }

  getTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'id')}
            sorted="">
            Transactions Id
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'type')}
            sorted="">
            Type
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'date')}
            sorted="">
            Date and Hour
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  getTable(transactions) {
    return (
      <Table className="table">
        {this.getTableHeader()}
        <Table.Body>
          {transactions.map(p => this.getTransactionsRow(p))}
        </Table.Body>
      </Table>
    );
  }

  getTransactionsRow(transaction) {
    return (
      <Table.Row
        key={transaction.hash}
        className={classnames(bem('transaction-row'))}
      >
        <Table.Cell>{transaction.hash}</Table.Cell>
        <Table.Cell>{this.renderType(transaction.type)}</Table.Cell>
        <Table.Cell>{transaction.date}GB</Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const {
      className,
      transactions,
      typeFilter,
    } = this.props;

    let filterDisplay = 'Transaction Type';
    const filterType = transactionTypes.find((t) => t.type === typeFilter);
    if (filterType) {
      filterDisplay = filterType.display;
    }

    return (
      <div className={classnames(bem(), className)}>
        <div className="row mb-3 align-items-center">
          <div className="col-3">
            <span className="font-italic">
              <span className="text-muted">
                Showing</span>&nbsp;
                { filterDisplay || 'all transactions' }
            </span>
          </div>
          <div className="col-9 text-right">
            <span className="text-muted mr-3">Filter by:</span>
            <Tooltip tooltip={this.renderTransactionTypes}>
              <FakeDropdown value={filterDisplay} />
            </Tooltip>
          </div>
        </div>
        <Card noPadding className="mb-4 mt-4">
          {this.getTable(transactions)}
        </Card>
      </div>
    );
  }
}

BaseTransactionsTable.defaultProps = {
  className: '',
};

/* eslint react/no-unused-prop-types: "off" */
BaseTransactionsTable.propTypes = {
  className: PropTypes.string,
  getAllTransactions: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const typeFilter = state.transactions.typeFilter;

  return {
    transactions: state.transactions.transactions.filter(
      t => !typeFilter || t.type === typeFilter
    ),
    typeFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllTransactions: () => dispatch(getAllTransactions()),
    setFilterType: (type) => dispatch(setFilterType(type)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseTransactionsTable);
