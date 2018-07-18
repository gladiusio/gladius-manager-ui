import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Card from './card';
import Table from './shared/table';
import poolPropType from '../propTypes/pool';
import {
  getAllPools,
} from '../state/pools';
import bemify from '../util/bemify';

const bem = bemify('pool-status-table');

export class BasePoolStatusTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRejected: false
    };

    this.setShowRejected = this.setShowRejected.bind(this);
  }

  componentWillMount() {
    this.props.getAllPools();
  }

  setShowRejected(show) {
    this.setState({showRejected: show});
  }

  renderStatus(status) {
    let text = '—';

    if (status === 'connected') {
      text = 'Connected';
    }

    if (status === 'accepted') {
      text = 'Accepted';
    }

    if (status === 'rejected') {
      text = 'Rejected';
    }

    if (status === 'pending') {
      text = 'Pending';
    }

    return (
      <span className={classnames(bem('status'), status)}>
        {text}
      </span>
    );
  }

  getTableHeader(hideHead) {
    return (
      <Table.Header className={classnames({'hidden-header': hideHead})}>
        <Table.Row>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'name')}
            sorted="">
            { hideHead ? null : 'Pool' }
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'status')}
            sorted="">
            { hideHead ? null : 'Status' }
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'bandwidth')}
            sorted="">
            { hideHead ? null : 'Bandwidth Use' }
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'nodes')}
            sorted="">
            { hideHead ? null : 'Nodes Connected' }
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'earnings')}
            sorted="">
            { hideHead ? null : 'Earnings' }
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  getTable(pools, hideHead) {
    return (
      <Table className="table">
        {this.getTableHeader(hideHead)}
        <Table.Body>
          {pools.map(p => this.getPoolRow(p))}
        </Table.Body>
      </Table>
    );
  }

  getRejectedPools(pools) {
    if (this.state.showRejected) {
      return this.getTable(pools, true);
    }

    return null;
  }

  getPoolRow(pool) {
    return (
      <Table.Row
        key={pool.address}
        className={classnames(bem('pool-row'))}
      >
        <Table.Cell>{pool.name}</Table.Cell>
        <Table.Cell>{this.renderStatus(pool.status)}</Table.Cell>
        <Table.Cell>{pool.bandwidthUse}GB</Table.Cell>
        <Table.Cell>{pool.nodeCount}</Table.Cell>
        <Table.Cell>
          <img src="./assets/images/icon-logo-small.svg" alt="" className="mr-2" />
          {pool.earnings} GLA
        </Table.Cell>
      </Table.Row>
    );
  }

  getShowButton() {
    let buttonText = 'Show Rejected Pools';
    let toggleValue = true;
    let icon = 'down';

    if (this.state.showRejected) {
      buttonText = 'Hide Rejected Pools';
      toggleValue = false;
      icon = 'up';
    }

    return (
      <div
        onClick={this.setShowRejected.bind(this, toggleValue)}
        className={classnames(bem('show-rejected p-2'))}
      >
        {buttonText}
        <img src={`./assets/images/icon-chevron-${icon}.svg`} alt="" />
      </div>
    );
  }

  getRejectedSection(rejectedPools) {
    if (!rejectedPools || rejectedPools.length === 0) {
      return null;
    }

    return (
      <div className={classnames(bem('rejected-container'))}>
        {this.getShowButton()}
        {this.getRejectedPools(rejectedPools)}
      </div>
    );
  }

  render() {
    const {
      className,
      pools,
      rejectedPools,
    } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <Card noPadding className="mb-4 mt-4">
          {this.getTable(pools)}
          {this.getRejectedSection(rejectedPools)}
        </Card>
      </div>
    );
  }
}

BasePoolStatusTable.defaultProps = {
  className: '',
};

/* eslint react/no-unused-prop-types: "off" */
BasePoolStatusTable.propTypes = {
  className: PropTypes.string,
  getAllPools: PropTypes.func.isRequired,
  pools: PropTypes.arrayOf(poolPropType).isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    pools: state.pools.availablePools.filter(pool => pool.status !== 'rejected'),
    rejectedPools: state.pools.availablePools.filter(pool => pool.status === 'rejected')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPools: () => dispatch(getAllPools()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePoolStatusTable);
