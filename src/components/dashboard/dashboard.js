import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Masthead from '../masthead';
import MastheadContentSplit from '../mastheadContentSplit';
import DashboardHome from './dashboardHome';
import Navigation from './navigation';
import bemify from '../../util/bemify';

const bem = bemify('dashboard');

export default function Dashboard() {
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
          </Switch>
        </div>
      </div>
    </MastheadContentSplit>
  );
}
