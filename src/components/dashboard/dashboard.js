import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Masthead from '../masthead';
import MastheadContentSplit from '../mastheadContentSplit';
import DashboardHome from './dashboardHome';
import Marketplace from './marketplace';
import ManageBalance from './manageBalance';
import Settings from './settings';
import StatusPage from './statusPage';
import WalletPage from './walletPage';
import Navigation from './navigation';
import bemify from '../../util/bemify';
import { authorizationSelectors } from '../../state/ducks/authorization';

const { getHasAccount } = authorizationSelectors;
const bem = bemify('dashboard');

function BaseDashboard({ hasAccount }) {
  if (!hasAccount) {
    return <Redirect to="/" />;
  }

  return (
    <MastheadContentSplit masthead={
      <Masthead containerClass="absolute">
        <Navigation />
      </Masthead>
    }>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <Switch>
            <Route exact path="/dashboard" render={
              () => <Redirect to="/dashboard/home" />
            } />
            <Route path="/dashboard/home" component={DashboardHome} />
            <Route path="/dashboard/wallet" component={WalletPage} />
            <Route path="/dashboard/marketplace" component={Marketplace} />
            <Route path="/dashboard/status" component={StatusPage} />
            <Route path="/dashboard/settings/balance" component={ManageBalance} />
            <Route path="/dashboard/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    </MastheadContentSplit>
  );
}


BaseDashboard.propTypes = {
  hasAccount: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    hasAccount: getHasAccount(state),
  };
}

export default connect(mapStateToProps)(BaseDashboard);
