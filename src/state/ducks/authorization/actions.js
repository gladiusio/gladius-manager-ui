import { createAction, createApiAction } from '../../../util/createAction';
import {
  SET_UNAUTHORIZED,
  RESET_UNAUTHORIZED,
  SET_HAS_ACCOUNT,
  API_OPEN_WALLET,
  API_FETCH_ACCOUNT,
} from './types';

export function openWallet(passphrase) {
  return createApiAction(API_OPEN_WALLET, {}, {
    path: '/keystore/account/open',
    method: 'POST',
    body: {
      passphrase,
    },
  });
}

export function fetchAccount() {
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
