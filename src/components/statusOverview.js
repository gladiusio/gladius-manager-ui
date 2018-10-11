import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ServiceStatusTable from './serviceStatusTable';
import PortStatusTable from './portStatusTable';
import Toggle from './toggle';
import Card from './card';
import StatusCard from './statusCard';
import { serviceInfoSelectors, serviceInfoActions } from '../state/ducks/serviceInfo';
import bemify from '../util/bemify';

const { getPortStatuses, getServiceStatuses, getShowAdvanced } = serviceInfoSelectors;
const { setShowAdvanced } = serviceInfoActions;
const bem = bemify('status-page');

class BaseStatusOverview extends Component {
  renderAdvanced() {
    const { portStatuses, serviceStatuses, showAdvanced } = this.props;
    if (!showAdvanced) {
      return null;
    }

    return (
      <div>
        <h4 className="p-0 mb-3">Service Status</h4>
        <div className="flex justify-content-between mb-5">
          <ServiceStatusTable serviceStatuses={serviceStatuses} />
        </div>
        <h4 className="p-0 mb-3">Port Status</h4>
        <div className="flex justify-content-between">
          <PortStatusTable portStatuses={portStatuses} />
        </div>
      </div>
    );
  }

  render() {
    const { showAdvanced, setShowAdvanced } = this.props;

    return (
      <div className={classnames(bem(), 'col-10 pt-5 pl-0 pr-0')}>
        <StatusCard className="col-6 p-0" />
        <div className="flex mt-5 mb-5">
          <div className="text-muted mr-3">Show advanced information</div>
          <Toggle on={showAdvanced} onClick={setShowAdvanced} />
        </div>
        {this.renderAdvanced()}
      </div>
    );
  }
}

BaseStatusOverview.propTypes = {
  serviceStatuses: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  return {
    serviceStatuses: getServiceStatuses(state),
    portStatuses: getPortStatuses(state),
    showAdvanced: getShowAdvanced(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowAdvanced: (showAdvanced) => dispatch(setShowAdvanced(showAdvanced))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatusOverview);
