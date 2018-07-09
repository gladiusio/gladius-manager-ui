import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './home';
import Signup from './signup';
import Dashboard from './dashboard/dashboard';

export default function App() {
  /*
    We need to Redirect to '/' if the pathname includes index.html
    because React Router doesn't play nice with electron.
    See here: https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron
  */
  return (
    <Switch>
      {window.location.pathname.includes('index.html') && <Redirect to="/" />}
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
