import test from 'tape';

import * as serviceInfoActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import mockStore from '../../../testUtils/mockStore';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import controldStatus from '../../../mockedResponses/controldStatus';
import networkdStatus from '../../../mockedResponses/networkdStatus';
import {
  SET_CONTROLD_RUNNING,
  SET_NETWORKD_RUNNING,
  API_CONTROLD_STATUS,
  API_NETWORKD_STATUS,
} from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.controldRunning, false);
  t.equals(state.networkdRunning, false);
  t.end();
});

test('ServiceInfo - setControldRunning', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(serviceInfoActions.setControldRunning(true))
  );

  t.strictEqual(state.controldRunning, true, 'sets the controld running to true');

  state = reducer(
    state,
    createTestAction(serviceInfoActions.setControldRunning(false))
  );

  t.strictEqual(state.controldRunning, false, 'sets the controld running to false');
  t.end();
});

test('ServiceInfo - setNetworkdRunning', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(serviceInfoActions.setNetworkdRunning(true))
  );

  t.strictEqual(state.networkdRunning, true, 'sets the networkd running to true');

  state = reducer(
    state,
    createTestAction(serviceInfoActions.setNetworkdRunning(false))
  );

  t.strictEqual(state.networkdRunning, false, 'sets the networkd running to false');
  t.end();
});


test('ServiceInfo - fetchServiceStatuses', (t) => {
  const store = mockStore();

  store.dispatch(serviceInfoActions.fetchServiceStatuses()).then(async () => {
    t.same(
      await getAction(store, API_CONTROLD_STATUS),
      createApiAction(API_CONTROLD_STATUS, {}, {
        path: '/service/stats/network-gateway',
        service: 'guardian',
      }),
      'makes the api request for network-gateway status'
    );

    t.same(
      await getAction(store, API_NETWORKD_STATUS),
      createApiAction(API_NETWORKD_STATUS, {}, {
        path: '/service/stats/edged',
        service: 'guardian',
      }),
      'makes the api request for edged status'
    );

    t.end();
  });
});
