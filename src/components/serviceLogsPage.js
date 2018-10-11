import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ServiceStatusTable from './serviceStatusTable';
import Card from './card';
import Logs from './logs';
import bemify from '../util/bemify';
import { serviceInfoSelectors, serviceInfoActions } from '../state/ducks/serviceInfo';

const { getLogs, getServiceName } = serviceInfoSelectors;
const {
  fetchStartingLogs,
  connectToServiceLogs,
  disconnectFromServiceLogs
} = serviceInfoActions;
const bem = bemify('service-logs-page');

class BaseServiceLogsPage extends Component {
  componentDidMount() {
    this.props.fetchServiceLogs();
    this.props.connectToServiceLogs(this.props.service);
  }

  componentWillUnmount() {
    this.props.disconnectFromServiceLogs(this.props.service);
  }

  render() {
    const { logs, name } = this.props;

    return (
      <div className={classnames(bem(), 'col-10 pt-5 pl-0 pr-0 mb-5')}>
        <Link
          to="/dashboard/status"
          className="btn btn-text btn-sm p-0 m-0 mb-2 pt-1"
        >
          <img className={classnames(bem('back'), 'mr-2')} src="./assets/images/icon-arrow-small.svg"/>
          Go back to Status Page
        </Link>
        <h2 className="p-0 mb-4">{name} Logs</h2>
        <div className="flex justify-content-between">
          <Logs logs={logs} />
        </div>
      </div>
    );
  }
}

BaseServiceLogsPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  const service = ownProps.match.params.service;
  return {
    logs: getLogs(state, service),
    name: getServiceName(state, service),
    service,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchServiceLogs: () => dispatch(fetchStartingLogs()),
    connectToServiceLogs: (service) => dispatch(connectToServiceLogs(service)),
    disconnectFromServiceLogs: (service) => dispatch(disconnectFromServiceLogs(service))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseServiceLogsPage);
