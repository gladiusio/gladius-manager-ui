import {
  GET_ALL_APPLICATIONS_ERROR,
  GET_ALL_APPLICATIONS_SUCCESS,
  SET_VIEWING_APPLICATION,
} from './types';

function reduceGetAllApplicationsSuccess(state, payload) {
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

function reduceSetViewingApplication(state, payload) {
  return {
    ...state,
    viewingApplication: payload.application,
  };
}

function getInitialState() {
  return {
    applications: [],
    viewingApplication: null,
  };
}

export default function applicationReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case GET_ALL_APPLICATIONS_SUCCESS:
      return reduceGetAllApplicationsSuccess(state, action.payload);
    case GET_ALL_APPLICATIONS_ERROR:
      return reduceGetAllApplicationsError(state, action.payload);
    case SET_VIEWING_APPLICATION:
      return reduceSetViewingApplication(state, action.payload);
    default:
      return state;
  }
}
