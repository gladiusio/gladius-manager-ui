import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Masthead from '../masthead';
import MastheadContentSplit from '../mastheadContentSplit';
import DashboardHome from './dashboardHome';
import Marketplace from './marketplace';
import ManageBalance from './manageBalance';
import Settings from './settings';
import Transactions from './transactions';
import Navigation from './navigation';
import Toasts from '../toasts';
import bemify from '../../util/bemify';

const bem = bemify('dashboard');

export default function Dashboard() {
  return (
    <MastheadContentSplit masthead={
      <Masthead containerClass="absolute">
        <Navigation />
      </Masthead>
    }>
      <Toasts></Toasts>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <Switch>
            <Route exact path="/dashboard" render={
              () => <Redirect to="/dashboard/home" />
            } />
            <Route path="/dashboard/home" component={DashboardHome} />
            <Route path="/dashboard/transactions" component={Transactions} />
            <Route path="/dashboard/marketplace" component={Marketplace} />
            <Route path="/dashboard/settings/balance" component={ManageBalance} />
            <Route path="/dashboard/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    </MastheadContentSplit>
  );
}
