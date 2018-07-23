import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StatusCard from '../statusCard';
import EarningsCard from '../earningsCard';
import ComingSoon from '../comingSoon';
import PoolStatusTable from '../poolStatusTable';
import bemify from '../../util/bemify';

const bem = bemify('dashboard-home');

class BaseDashboardHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classnames(bem(), 'col-9 pt-5')}>
        <div className="row justify-content-between">
          <StatusCard className="col-6" />
          <EarningsCard className="col-6" />
        </div>
        <ComingSoon className="mt-4">
          <PoolStatusTable />
        </ComingSoon>
      </div>
    );
  }
}

BaseDashboardHome.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(null, null)(BaseDashboardHome);
