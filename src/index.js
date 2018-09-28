import 'babel-polyfill';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/app';
import { storeFactory } from './state/store';

if (window.Raven) {
  window.Raven.config(
    process.env.SENTRY_DSN,
  ).install();
}

const history = createHistory();
const store = storeFactory(undefined, history);

function initApp() {
  ReactDOM.render(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    ),
    document.getElementById('root'),
  );
}

if (window.Raven) {
  window.Raven.context(function () {
    initApp();
  });
} else {
  initApp();
}
