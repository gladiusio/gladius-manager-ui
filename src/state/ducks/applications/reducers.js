import {
  GET_ALL_APPLICATIONS_ERROR,
  GET_ALL_APPLICATIONS_SUCCESS,
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

function getInitialState() {
  return {
    applications: [],
  };
}

export default function applicationReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case GET_ALL_APPLICATIONS_SUCCESS:
      return reduceGetAllApplicationsSuccess(state, action.payload);
    case GET_ALL_APPLICATIONS_ERROR:
      return reduceGetAllApplicationsError(state, action.payload);
    default:
      return state;
  }
}
