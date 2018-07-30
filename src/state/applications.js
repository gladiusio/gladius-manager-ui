import { nameAction, createAction } from '../util/createAction';
import { getJSON, delayed } from '../backend';
import mockedApplicationsResponse from './mockedResponses/applications';

const mockData = process.env.MOCK_DATA === "true";

const namespace = 'applications';

const GET_ALL_APPLICATIONS_ERROR = nameAction(namespace, 'GET_ALL_APPLICATIONS_ERROR');
const GET_ALL_APPLICATIONS_SUCCESS = nameAction(namespace, 'GET_ALL_APPLICATIONS_SUCCESS');

function getInitialState() {
  return {
    applications: [],
  };
}

function fetchApplications() {
  if (mockData) {
    return delayed(() => {
      return mockedApplicationsResponse;
    }, 2000);
  }

  return getJSON(`${process.env.CONTROL_API}/node/applications`);
}

export function getPendingApplications(applications) {
  return applications.filter((application) => {
    return application && !application.profile.accepted.Valid;
  });
}

export function getAcceptedApplications(applications) {
  return applications.filter((application) => {
    return application && application.profile.accepted.Valid &&
      application.profile.accepted.Bool;
  });
}

export function getRejectedApplications(applications) {
  return applications.filter((application) => {
    return application && application.profile.accepted.Valid &&
      !application.profile.accepted.Bool;
  });
}

export function isPending(application) {
  return application && !application.profile.accepted.Valid;
}

export function isRejected(application) {
  return application && application.profile.accepted.Valid &&
    !application.profile.accepted.Bool;
}

export function isAccepted(application) {
  return application && application.profile.accepted.Valid &&
    application.profile.accepted.Bool;
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
      const applicationsResponse = await fetchApplications();
      if (applicationsResponse.error) {
        return dispatch(getAllApplicationsError(applicationsResponse.error));
      }

      return dispatch(getAllApplicationsSuccess(applicationsResponse.response));
    } catch (err) {
      return dispatch(getAllApplicationsError(err));
    }
  }
}

function reduceGetAllPoolsSuccess(state, payload) {
  return {
    ...state,
    applications: payload.applications,
  };
}

function reduceGetAllApplicationsError(state) {
  return {
    ...state,
  };
}

export default function poolReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case GET_ALL_APPLICATIONS_SUCCESS:
      return reduceGetAllPoolsSuccess(state, action.payload);
    case GET_ALL_APPLICATIONS_ERROR:
      return reduceGetAllApplicationsError(state, action.payload);
    default:
      return state;
  }
}
