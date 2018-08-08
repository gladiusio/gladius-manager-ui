import {
  SET_UNAUTHORIZED,
  RESET_UNAUTHORIZED,
  SET_HAS_ACCOUNT
} from './types';

function getInitialState() {
  return {
    failedAction: null,
    isUnauthorized: false,
    hasAccount: false,
  };
}

export default function authorizationReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_UNAUTHORIZED:
      return {
        ...state,
        failedAction: action.payload.failedAction,
        isUnauthorized: true,
      };
    case RESET_UNAUTHORIZED:
      return {
        ...state,
        failedAction: null,
        isUnauthorized: false,
      };
    case SET_HAS_ACCOUNT:
      return {
        ...state,
        hasAccount: action.payload.hasAccount,
      };
    default:
      return state;
  }
}
