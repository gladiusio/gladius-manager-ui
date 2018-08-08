import { createAction, createApiAction } from '../../../util/createAction';
import { delayed } from '../../../backend';
import mockedApplicationsResponse from '../../../mockedResponses/applications';
import {
  API_FETCH_APPLICATIONS,
  GET_ALL_APPLICATIONS_ERROR,
  GET_ALL_APPLICATIONS_SUCCESS,
} from './types';

const mockData = process.env.MOCK_DATA === "true";

export function fetchApplications() {
  if (mockData) {
    return delayed(() => {
      return mockedApplicationsResponse;
    }, 2000);
  }

  return async (dispatch) => {
    return await dispatch(createApiAction(API_FETCH_APPLICATIONS, {}, {
      path: '/node/applications',
      method: 'GET'
    }));
  };
}

export function getAllApplicationsError(error) {
  return async dispatch => dispatch(createAction(GET_ALL_APPLICATIONS_ERROR, {
    error,
  }));
}

export function getAllApplicationsSuccess(applications) {
  return async dispatch => dispatch(createAction(GET_ALL_APPLICATIONS_SUCCESS, {
    applications,
  }));
}

export function getApplications() {
  return async (dispatch) => {
    try {
      const applicationsResponse = await dispatch(fetchApplications());
      if (applicationsResponse.error) {
        return dispatch(getAllApplicationsError(applicationsResponse.error));
      }

      return dispatch(getAllApplicationsSuccess(applicationsResponse.response));
    } catch (err) {
      return dispatch(getAllApplicationsError(err));
    }
  }
}
