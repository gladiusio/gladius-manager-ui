import test from 'tape';

import * as applicationsActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import mockStore from '../../../testUtils/mockStore';
import { API_FETCH_APPLICATIONS, GET_ALL_APPLICATIONS_SUCCESS } from './types';
import mockedApplications from '../../../mockedResponses/applications'

test('reducer defaults', (t) => {
  const state = reducer();

  t.same(state.applications, []);
  t.equals(state.viewingApplication, null);
  t.end();
});

test('Applications - reduceGetAllApplicationsSuccess', (t) => {
  let state = reducer();

  state = reducer(
    state,
    createTestAction(applicationsActions.getAllApplicationsSuccess(
      mockedApplications.response
    ))
  );

  t.same(state.applications, mockedApplications.response, 'sets applications');
  t.end();
});

test('Applications - setViewingApplication', (t) => {
  let state = reducer();
  const testApplication = mockedApplications.response[0];

  state = reducer(
    state,
    createTestAction(applicationsActions.setViewingApplication(
      testApplication
    ))
  );

  t.same(state.viewingApplication, testApplication, 'sets the viewing application');
  t.end();
});

test('Applications - getApplications', (t) => {
  const store = mockStore();

  store.dispatch(applicationsActions.getApplications()).then(async () => {
    t.same(
      await getAction(store, API_FETCH_APPLICATIONS),
      createApiAction(API_FETCH_APPLICATIONS, {}, {
        path: '/node/applications',
        method: 'GET'
      }),
      'makes the api request'
    );

    t.same(
      await getAction(store, GET_ALL_APPLICATIONS_SUCCESS),
      { type: GET_ALL_APPLICATIONS_SUCCESS, payload: { applications: mockedApplications.response } },
      'sets the applications from the response'
    );
    t.end();
  });
});
