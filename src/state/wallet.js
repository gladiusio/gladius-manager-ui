import { nameAction, createAction, createApiAction } from '../util/createAction';
import { authorizeUser } from './authorization';
import { getJSON, postData, delayed } from '../backend';

const namespace = 'wallet';
const mockData = process.env.MOCK_DATA === "true";

export const SET_PROCESSING_BALANCE = nameAction(namespace, 'SET_PROCESSING_BALANCE');
export const SET_WALLET_ADDRESS = nameAction(namespace, 'SET_WALLET_ADDRESS');

const SET_WALLET_LOADING = nameAction(namespace, 'SET_WALLET_LOADING');
const SET_WALLET_SUCCESS = nameAction(namespace, 'SET_WALLET_SUCCESS');

const SET_GLA_BALANCE_LOADING = nameAction(namespace, 'SET_GLA_BALANCE_LOADING');
const SET_GLA_BALANCE_SUCCESS = nameAction(namespace, 'SET_GLA_BALANCE_SUCCESS');

const API_FETCH_BALANCE = nameAction(namespace, 'API_FETCH_BALANCE');

export function setWalletAddress(address) {
  return createAction(SET_WALLET_ADDRESS, { address });
}

export function setWalletSuccess(walletCreated) {
  return createAction(SET_WALLET_SUCCESS, { walletCreated });
}

function setWalletIsLoading(walletLoading) {
  return createAction(SET_WALLET_LOADING, { walletLoading });
}

function setGlaBalanceIsLoading(glaBalanceLoading) {
  return createAction(SET_GLA_BALANCE_LOADING, { glaBalanceLoading });
}

function setGlaBalanceSuccess(glaBalance) {
  return createAction(SET_GLA_BALANCE_SUCCESS, { glaBalance });
}

function createWallet(passphrase) {
  if (mockData) {
    return delayed(() => {
      return {
        success: true,
        error: false,
        response: {
          address: "myaddresshere",
        },
      };
    }, 2000);
  }

  return postData(
    `${process.env.CONTROL_API}/keystore/account/create`,
    { passphrase }
  );
}

function createPGPKey(name, email) {
  if (mockData) {
    return delayed(() => {
      return {
        success: true,
        error: false,
      };
    }, 2000);
  }

  return postData(
    `${process.env.CONTROL_API}/keystore/pgp/create`,
    { name, email }
  );
}

function fetchBalance(walletAddress, balanceType="gla") {
  if (mockData) {
    return delayed(() => {
      return {
        success: true,
        error: false,
        response: {
          value: 200,
          symbol: 'gla',
        },
      };
    }, 2000);
  }

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
      const wallet = await createWallet(passphrase);
      if (wallet.error) {
        throw new Error('Wallet creation failed!');
      }
      const walletAddress = wallet.response.address;
      await dispatch(authorizeUser(passphrase));
      dispatch(setWalletAddress(walletAddress));
      dispatch(setWalletSuccess(true));
    }

    const { account } = getState();
    const { email, name, passphraseValue } = account;

    return new Promise(async (resolve, reject) => {
      dispatch(setWalletIsLoading(true));
      try {
        await createWalletAndKey(passphraseValue, email, name);
        dispatch(setWalletIsLoading(false));
        resolve();
      } catch (e) {
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

    const { walletAddress } = getState().wallet;

    dispatch(setGlaBalanceIsLoading(true));
    requestBalance(walletAddress);
    dispatch(setGlaBalanceIsLoading(false));
  };
}

function reduceSetProcessingBalance(state, payload) {
  return {
    ...state,
    processingBalance: payload.balance,
  };
}

function getInitialState() {
  return {
    walletAddress: null,
    ethBalance: null,
    glaBalance: null,
    walletLoading: false,
  };
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_PROCESSING_BALANCE:
      return reduceSetProcessingBalance(state, action.payload);
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload.address,
      };
    case SET_WALLET_LOADING:
      return {
        ...state,
        walletLoading: action.payload.walletLoading,
      };
    case SET_WALLET_SUCCESS:
      return {
        ...state,
        walletCreated: action.payload.walletCreated,
      };
    case SET_GLA_BALANCE_LOADING:
      return {
        ...state,
        glaBalanceLoading: action.payload.glaBalanceLoading,
      };
    case SET_GLA_BALANCE_SUCCESS:
      return {
        ...state,
        glaBalance: action.payload.glaBalance,
      };
    default:
      return state;
  }
}
