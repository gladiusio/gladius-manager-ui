import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Card from './card';
import Table from './shared/table';
import bemify from '../util/bemify';

const bem = bemify('service-status-table');

const iconMap = {
  running: 'status-active-big',
  down: 'close-red',
};
const textMap = {
  running: 'Running',
  down: 'Not Running',
};

export default class ServiceStatusTable extends Component {
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
            className={classnames(bem('header-cell'), 'service')}
            sorted="">
            Service
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'status')}
            sorted="">
            Status
          </Table.HeaderCell>
          <Table.HeaderCell
            className={classnames(bem('header-cell'), 'logs')}
            sorted="">
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  getEmptyRow(serviceStatuses) {
    if (!serviceStatuses || serviceStatuses.length === 0) {
      return (
        <div className="text-center text-muted p-3">
          There are currently no statuses.
        </div>
      );
    }

    return null;
  }

  getTable(serviceStatuses) {
    return (
      <Table className="table">
        {this.getTableHeader()}
        <Table.Body>
          {serviceStatuses.map(p => this.getServiceStatusRow(p))}
        </Table.Body>
      </Table>
    );
  }

  getServiceStatusRow(serviceStatus) {
    return (
      <Table.Row
        key={serviceStatus.name}
      >
        <Table.Cell>
          <span>{serviceStatus.name}</span>
        </Table.Cell>
        {this.renderStatus(serviceStatus.status)}
        <Table.Cell className={bem('view-logs')}>
          <Link
            to={`/dashboard/status/${serviceStatus.id}/logs`}
            className="text-muted"
          >
            <img src="./assets/images/icon-marketplace-off.svg" alt="" className="mr-2" />
            View logs
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const {
      className,
      serviceStatuses,
    } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <Card noPadding>
          {this.getTable(serviceStatuses)}
          {this.getEmptyRow(serviceStatuses)}
        </Card>
      </div>
    );
  }
}

ServiceStatusTable.defaultProps = {
  className: '',
  serviceStatuses: [],
};

ServiceStatusTable.propTypes = {
  className: PropTypes.string,
  serviceStatuses: PropTypes.arrayOf(PropTypes.object),
};
