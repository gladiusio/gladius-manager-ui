import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import StatusCard from '../statusCard';
import EarningsCard from '../earningsCard';
import ComingSoon from '../comingSoon';
import PoolStatusTable from '../poolStatusTable';
import bemify from '../../util/bemify';

const bem = bemify('dashboard-home');

export default class BaseDashboardHome extends Component {
  render() {
    return (
      <div className={classnames(bem(), 'col-9 pt-5')}>
        <div className="row justify-content-between">
          <StatusCard className="col-6" />
          <EarningsCard className="col-6" />
        </div>
        <PoolStatusTable className="mt-4" />
      </div>
    );
  }
}
