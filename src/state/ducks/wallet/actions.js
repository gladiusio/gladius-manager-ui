import { createAction, createApiAction } from '../../../util/createAction';
import { setWalletSuccess } from '../signup/actions';
import { authorizeUser } from '../authorization/actions';
import { accountSelectors } from '../account';
import { getJSON, postData, delayed } from '../../../backend';
import { getWalletAddress } from './selectors';
import {
  SET_PROCESSING_BALANCE,
  SET_WALLET_ADDRESS,
  SET_WALLET_LOADING,
  SET_GLA_BALANCE_LOADING,
  SET_GLA_BALANCE_SUCCESS,
  SET_ETH_BALANCE_SUCCESS,
  API_FETCH_BALANCE,
  API_CREATE_WALLET
} from './types';

const {
  getEmail,
  getName,
  getPassphrase
} = accountSelectors;

export function setWalletAddress(address) {
  return createAction(SET_WALLET_ADDRESS, { address });
}

export function setWalletIsLoading(walletLoading) {
  return createAction(SET_WALLET_LOADING, { walletLoading });
}

export function setGlaBalanceIsLoading(glaBalanceLoading) {
  return createAction(SET_GLA_BALANCE_LOADING, { glaBalanceLoading });
}

export function setGlaBalanceSuccess(glaBalance) {
  return createAction(SET_GLA_BALANCE_SUCCESS, { glaBalance });
}

export function setEthBalanceSuccess(ethBalance) {
  return createAction(SET_ETH_BALANCE_SUCCESS, { ethBalance });
}

export function createWallet(passphrase) {
  return async (dispatch) => {
    return await dispatch(createApiAction(API_CREATE_WALLET, {}, {
      path: '/keystore/account/create',
      method: 'POST',
      body: { passphrase },
    }));
  };
}

export function fetchBalance(walletAddress, balanceType="gla") {
  return async (dispatch) => {
    return await dispatch(createApiAction(API_FETCH_BALANCE, {}, {
      path: `/account/${walletAddress}/balance/${balanceType}`,
      method: 'GET'
    }));
  };
}

export function setProcessingBalance(balance) {
  return createAction(SET_PROCESSING_BALANCE, {
    balance,
  });
}

export function createUserWallet() {
  return async (dispatch, getState) => {
    async function createWalletAndKey(passphrase, email, name) {
      const wallet = await dispatch(createWallet(passphrase));
      if (wallet.error) {
        throw new Error('Wallet creation failed!');
      }
      const walletAddress = wallet.response.address;
      await dispatch(authorizeUser(passphrase));
      dispatch(setWalletAddress(walletAddress));
      dispatch(setWalletSuccess(true));
    }

    const state = getState();
    const email = getEmail(state);
    const name = getName(state);
    const passphraseValue = getPassphrase(state);

    return new Promise(async (resolve, reject) => {
      dispatch(setWalletIsLoading(true));
      try {
        await createWalletAndKey(passphraseValue, email, name);
        dispatch(setWalletIsLoading(false));
        resolve();
      } catch (e) {
        console.log(e);
        dispatch(setWalletIsLoading(false));
        reject();
      }
    });
  };
}

export function fetchGLABalance() {
  return async (dispatch, getState) => {
    async function requestBalance(walletAddress) {
      const request = await dispatch(fetchBalance(walletAddress));
      if (request.error) {
        throw new Error('GLA fetch balance failed!');
      }
      const glaBalance = request.response.value;

      dispatch(setGlaBalanceSuccess(glaBalance));
    }

    const walletAddress = getWalletAddress(getState());

    dispatch(setGlaBalanceIsLoading(true));
    requestBalance(walletAddress);
    return dispatch(setGlaBalanceIsLoading(false));
  };
}

export function fetchETHBalance() {
  return async (dispatch, getState) => {
    async function requestBalance(walletAddress) {
      const request = await dispatch(fetchBalance(walletAddress, 'eth'));
      if (request.error) {
        throw new Error('ETH fetch balance failed!');
      }
      const ethBalance = request.response.value;

      return dispatch(setEthBalanceSuccess(ethBalance));
    }

    const walletAddress = getWalletAddress(getState());

    return requestBalance(walletAddress);
  };
}
