import test from 'tape';

import * as accountActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import mockStore from '../../../testUtils/mockStore';
import {
  SET_EMAIL_ADDRESS_SUCCESS,
  SET_EMAIL_ADDRESS_FAILURE,
  SET_NAME_SUCCESS,
  SET_NAME_FAILURE
} from './types';
import { API_APPLY_TO_POOL } from '../pools/types';
import mockedApplications from '../../../mockedResponses/applications';

test('reducer defaults', (t) => {
  const state = reducer();

  t.same(state, {});
  t.end();
});

test('Account - setEmailAddressAndName - success', (t) => {
  const store = mockStore();

  store.dispatch(accountActions.setEmailAddressAndName(
    'email@email.com',
    'myusername'
  )).then(async () => {
    t.same(
      await getAction(store, SET_EMAIL_ADDRESS_SUCCESS),
      accountActions.setEmailAddressSuccess('email@email.com'),
      'sets the email'
    );

    t.same(
      await getAction(store, SET_NAME_SUCCESS),
      accountActions.setNameSuccess('myusername'),
      'sets the name'
    );
    t.end();
  });
});

test('Account - setPassphrase', (t) => {
  let state = reducer();

  state = reducer(
    state,
    createTestAction(accountActions.setPassphrase(
      { passphraseValue: 'mypassphrase' }
    ))
  );

  t.same(state.passphraseValue, 'mypassphrase', 'sets the passphrase');
  t.end();
});

test('Account - createApplications', (t) => {
  const store = mockStore({
    account: {
      email: 'my@email.com',
      name: 'johndoe'
    },
    expectedUsage: {
      bio: '1234',
      estimatedSpeed: 10,
    }
  });
  const testApplications = [{id: 1}, {id: 2}, {id: 3}];

  store.dispatch(accountActions.createApplications(testApplications)).then(async () => {
    const actions = store.getActions();
    const applicationActions = actions.filter((action) =>
      action.type === API_APPLY_TO_POOL
    );
    t.equals(applicationActions.length, testApplications.length, 'should create an application for each pool');
    t.end();
  });
});
