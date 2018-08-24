import 'babel-polyfill';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/app';
import { storeFactory, saveState } from './state/store';

if (window.Raven) {
  window.Raven.config(
    'https://587a7c212c904b70afe329b94819f8ba@sentry.io/1268531'
  ).install();
}

const history = createHistory();
const store = storeFactory(undefined, history);

store.subscribe(() => saveState(store.getState()));

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
