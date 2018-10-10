import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import StatusOverview from '../statusOverview';
import ServiceLogsPage from '../serviceLogsPage';
import Card from '../card';
import bemify from '../../util/bemify';
const bem = bemify('status-page');

export default class StatusPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/dashboard/status" component={StatusOverview} />
        <Route path="/dashboard/status/:service/logs" component={ServiceLogsPage} />
      </Switch>
    );
  }
}
