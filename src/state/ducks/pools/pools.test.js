import test from 'tape';

import * as poolsActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import mockStore from '../../../testUtils/mockStore';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import mockedPools from '../../../mockedResponses/pools'
import { API_APPLY_TO_POOL, GET_ALL_POOLS_SUCCESS } from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.same(state.availablePools, []);
  t.equals(state.sortDirection, 'desc');
  t.equals(state.sortColumn, null);
  t.same(state.locationFilter, []);
  t.equals(state.ratingFilter, 0);
  t.same(state.nodeCountFilter, [0, Number.POSITIVE_INFINITY]);
  t.same(state.earningsFilter, [0, Number.POSITIVE_INFINITY]);
  t.end();
});

test('Pools - setLocationFilter', (t) => {
  let state = reducer();
  let testLocations = ['AL', 'AZ'];
  state = reducer(
    state,
    createTestAction(poolsActions.setLocationFilter(testLocations))
  );

  t.strictEqual(state.locationFilter, testLocations, 'sets the locations');
  t.end();
});

test('Pools - setRatingFilter', (t) => {
  let state = reducer();
  let testRating = 3;
  state = reducer(
    state,
    createTestAction(poolsActions.setRatingFilter(testRating))
  );

  t.strictEqual(state.ratingFilter, testRating, 'sets the rating filter');
  t.end();
});

test('Pools - setNodeCountFilter', (t) => {
  let state = reducer();
  let testNodeCount = [12, 55];
  state = reducer(
    state,
    createTestAction(poolsActions.setNodeCountFilter(testNodeCount))
  );

  t.same(state.nodeCountFilter, testNodeCount, 'sets the node count filter');
  t.end();
});

test('Pools - setEarningsFilter', (t) => {
  let state = reducer();
  let testEarningsFilter = [2, 13];
  state = reducer(
    state,
    createTestAction(poolsActions.setEarningsFilter(testEarningsFilter))
  );

  t.same(state.earningsFilter, testEarningsFilter, 'sets the earnings filter');
  t.end();
});

test('Pools - getAllPoolsSuccess', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(poolsActions.getAllPoolsSuccess(mockedPools))
  );

  t.same(state.availablePools, mockedPools, 'sets the pools');
  t.end();
});

test('Pools - handleSort', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(poolsActions.handleSort('id'))
  );

  t.equals(state.sortColumn, 'id', 'sets the sort column');
  t.equals(state.sortDirection, 'asc', 'direction starts as asc');

  state = reducer(
    state,
    createTestAction(poolsActions.handleSort('id'))
  );

  t.equals(state.sortColumn, 'id', 'sort column stays the same');
  t.equals(state.sortDirection, 'desc', 'column changes to desc');

  state = reducer(
    state,
    createTestAction(poolsActions.handleSort('name'))
  );

  t.equals(state.sortColumn, 'name', 'sort column updates to name');
  t.equals(state.sortDirection, 'asc', 'column changes back to asc');

  t.end();
});

test('Pools - applyToPool', (t) => {
  const store = mockStore();
  const testBody = {
    estimatedSpeed: 55,
    name: 'tester',
    email: 'tester@test.co',
    bio: 'my bio'
  };
  const testPoolId = 'myhash';

  store.dispatch(poolsActions.applyToPool(testPoolId, testBody)).then(async () => {
    t.same(
      await getAction(store, API_APPLY_TO_POOL),
      createApiAction(API_APPLY_TO_POOL, {}, {
        path: `/node/applications/${testPoolId}/new`,
        method: 'POST',
        body: testBody,
      }),
      'makes the api request with correct parameters'
    );

    t.end();
  });
});
