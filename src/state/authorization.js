import { nameAction, createAction, createApiAction } from '../util/createAction';

const namespace = 'authorization';

const SET_UNAUTHORIZED = nameAction(namespace, 'SET_UNAUTHORIZED');
const RESET_UNAUTHORIZED = nameAction(namespace, 'RESET_UNAUTHORIZED');
const SET_HAS_ACCOUNT = nameAction(namespace, 'SET_HAS_ACCOUNT');

const API_OPEN_WALLET = nameAction(namespace, 'API_OPEN_WALLET');
const API_FETCH_ACCOUNT = nameAction(namespace, 'API_FETCH_ACCOUNT');

function openWallet(passphrase) {
  return createApiAction(API_OPEN_WALLET, {}, {
    path: '/keystore/account/open',
    method: 'POST',
    body: {
      passphrase,
    },
  });
}

function fetchAccount() {
  return createApiAction(API_FETCH_ACCOUNT, {}, {
    path: '/keystore/account',
    method: 'GET',
  });
}

export function authorizeUser(passphrase) {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const request = await dispatch(openWallet(passphrase));
      if (request.error) {
        reject();
        return;
      }

      dispatch(resetUnauthorized());
      resolve();
    });
  };
}

export function getAccount() {
  return async (dispatch, getState) => {
    const request = await dispatch(fetchAccount());
    if (request.error) {
      return;
    }

    if (request.response && request.response.address) {
      dispatch(setHasAccount(true));
    }
  };
}

export function setUnauthorized(failedAction) {
  return createAction(SET_UNAUTHORIZED, {
    failedAction,
  });
}

export function setHasAccount(hasAccount) {
  return createAction(SET_HAS_ACCOUNT, {
    hasAccount,
  });
}

export function resetUnauthorized() {
  return createAction(RESET_UNAUTHORIZED);
}

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
