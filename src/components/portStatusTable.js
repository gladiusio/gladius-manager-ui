import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Card from './card';
import Table from './shared/table';
import bemify from '../util/bemify';

const bem = bemify('port-status-table');

const iconMap = {
  connected: 'status-active-big',
  na: 'status-inactive-big',
};
const textMap = {
  connected: 'Connected',
  na: 'N/A',
};

export default class PortStatusTable extends Component {
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
            className={classnames(bem('header-cell'), 'port')}
            sorted="">
            Port
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

  getEmptyRow(portStatuses) {
    if (!portStatuses || portStatuses.length === 0) {
      return (
        <div className="text-center text-muted p-3">
          There are currently no statuses.
        </div>
      );
    }

    return null;
  }

  getTable(portStatuses) {
    return (
      <Table className="table">
        {this.getTableHeader()}
        <Table.Body>
          {portStatuses.map(p => this.getPortStatusRow(p))}
        </Table.Body>
      </Table>
    );
  }

  getPortStatusRow(portStatus) {
    return (
      <Table.Row
        key={portStatus.name}
      >
        <Table.Cell>
          <span>{portStatus.name}</span>
        </Table.Cell>
        {this.renderStatus(portStatus.status)}
      </Table.Row>
    );
  }

  render() {
    const {
      className,
      portStatuses,
    } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <Card noPadding>
          {this.getTable(portStatuses)}
          {this.getEmptyRow(portStatuses)}
        </Card>
      </div>
    );
  }
}

PortStatusTable.defaultProps = {
  className: '',
  portStatuses: [],
};

PortStatusTable.propTypes = {
  className: PropTypes.string,
  portStatuses: PropTypes.arrayOf(PropTypes.object),
};
