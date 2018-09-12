import test from 'tape';
import * as signupActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import mockStore from '../../../testUtils/mockStore';
import {
  SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS
} from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.same(state.currentStep, {index: 0});
  t.same(state.poolIds, []);
  t.equals(state.appliedToPool, false);
  t.equals(state.walletCreated, false);
  t.end();
});

test('Signup - setCurrentSignupStepIndex', (t) => {
  const store = mockStore({
    signup: reducer()
  });

  store.dispatch(signupActions.setCurrentSignupStepIndex(2)).then(async () => {
    t.same(
      await getAction(store, SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS),
      { type: SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS, payload: { index: 2 } },
      'sets the current step'
    );
    t.end();
  });

});

test('Signup - nextSignupStep', (t) => {
  const state = reducer();
  state.currentStep.index = 1;
  const store = mockStore({ signup: state });

  store.dispatch(signupActions.nextSignupStep()).then(async () => {
    t.same(
      await getAction(store, SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS),
      { type: SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS, payload: { index: 2 } },
      'increments the current step'
    );
    t.end();
  });
});

test('Signup - prevSignupStep', (t) => {
  const state = reducer();
  state.currentStep.index = 1;
  const store = mockStore({ signup: state });

  store.dispatch(signupActions.prevSignupStep()).then(async () => {
    t.same(
      await getAction(store, SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS),
      { type: SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS, payload: { index: 0 } },
      'decrements the current step'
    );
    t.end();
  });
});

test('Signup - toggleSelectedPool', (t) => {
  let state = reducer();

  state = reducer(
    state,
    createTestAction(signupActions.toggleSelectedPool(
      'mypool'
    ))
  );

  t.same(state.poolIds, ['mypool'], 'adds the pool id if not already there');

  state = reducer(
    state,
    createTestAction(signupActions.toggleSelectedPool(
      'mypool'
    ))
  );

  t.same(state.poolIds, [], 'removes the pool id if there');
  t.end();
});

test('Signup - setWalletSuccess', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(signupActions.setWalletSuccess(
      true
    ))
  );

  t.same(state.walletCreated, true, 'sets wallet created');
  t.end();
});

test('Signup - setApplicationSuccess', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(signupActions.setApplicationSuccess(
      []
    ))
  );

  t.same(state.appliedToPool, true, 'sets applied to pool');
  t.end();
});
