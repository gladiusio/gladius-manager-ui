import 'babel-polyfill';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/app';
import { storeFactory, saveState } from './state/store';

const history = createHistory();
const store = storeFactory(undefined, history);

store.subscribe(() => saveState(store.getState()));

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
