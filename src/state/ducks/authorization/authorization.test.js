import test from 'tape';

import * as authorizationActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import mockStore from '../../../testUtils/mockStore';
import { API_FETCH_ACCOUNT } from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.failedAction, null);
  t.equals(state.isUnauthorized, false);
  t.equals(state.hasAccount, false);
  t.end();
});

test('Authorization - setUnauthorized', (t) => {
  let state = reducer();

  state = reducer(
    state,
    createTestAction(authorizationActions.setUnauthorized())
  );

  t.strictEqual(state.isUnauthorized, true, 'sets state to unauthorized');
  t.end();
});

test('Authorization - setHasAccount', (t) => {
  let state = reducer();

  state = reducer(
    state,
    createTestAction(authorizationActions.setHasAccount(true))
  );

  t.strictEqual(state.hasAccount, true, 'sets hasAccount to true');

  state = reducer(
    state,
    createTestAction(authorizationActions.setHasAccount(false))
  );

  t.strictEqual(state.hasAccount, false, 'sets hasAccount to false');
  t.end();
});

test('Authorization - resetUnauthorized', (t) => {
  let state = reducer();

  state = reducer(
    state,
    createTestAction(authorizationActions.setUnauthorized())
  );
  state = reducer(
    state,
    createTestAction(authorizationActions.resetUnauthorized())
  );

  t.equals(state.isUnauthorized, false);
  t.end();
});

test('Authorization - fetchAccount', (t) => {
  const store = mockStore({});

  store.dispatch(authorizationActions.fetchAccount()).then(async () => {
    t.same(
      await getAction(store, API_FETCH_ACCOUNT),
      createApiAction(API_FETCH_ACCOUNT, {}, {
        path: '/keystore/account',
        method: 'GET',
      }),
      'makes request for account'
    );

    t.end();
  });
});
