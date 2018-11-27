import test from 'tape';

import * as serviceInfoActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import mockStore from '../../../testUtils/mockStore';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import networkGatewayStatus from '../../../mockedResponses/networkGatewayStatus';
import edgedStatus from '../../../mockedResponses/edgedStatus';
import {
  SET_NETWORK_GATEWAY_RUNNING,
  SET_EDGED_RUNNING,
  API_NETWORK_GATEWAY_STATUS,
  API_EDGED_STATUS,
} from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.networkGatewayRunning, false);
  t.equals(state.edgedRunning, false);
  t.end();
});

test('ServiceInfo - setNetworkGatewayRunning', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(serviceInfoActions.setNetworkGatewayRunning(true))
  );

  t.strictEqual(state.networkGatewayRunning, true, 'sets the network gateway running to true');

  state = reducer(
    state,
    createTestAction(serviceInfoActions.setNetworkGatewayRunning(false))
  );

  t.strictEqual(state.networkGatewayRunning, false, 'sets the network gateway running to false');
  t.end();
});

test('ServiceInfo - setEdgedRunning', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(serviceInfoActions.setEdgedRunning(true))
  );

  t.strictEqual(state.edgedRunning, true, 'sets the edged running to true');

  state = reducer(
    state,
    createTestAction(serviceInfoActions.setEdgedRunning(false))
  );

  t.strictEqual(state.edgedRunning, false, 'sets the edged running to false');
  t.end();
});


test('ServiceInfo - fetchServiceStatuses', (t) => {
  const store = mockStore();

  store.dispatch(serviceInfoActions.fetchServiceStatuses()).then(async () => {
    t.same(
      await getAction(store, API_NETWORK_GATEWAY_STATUS),
      createApiAction(API_NETWORK_GATEWAY_STATUS, {}, {
        path: '/service/stats/network-gateway',
        service: 'guardian',
      }),
      'makes the api request for network-gateway status'
    );

    t.same(
      await getAction(store, API_EDGED_STATUS),
      createApiAction(API_EDGED_STATUS, {}, {
        path: '/service/stats/edged',
        service: 'guardian',
      }),
      'makes the api request for edged status'
    );

    t.end();
  });
});
