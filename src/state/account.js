import { createAction, nameAction } from '../util/createAction';
import { ErrorState, LoadingState } from '../util/stateValues';
import { getJSON, postData, delayed } from '../backend';

const namespace = 'account';
const mockData = false;

export const SET_EMAIL_ADDRESS = nameAction(namespace, 'SET_EMAIL_ADDRESS');
export const SET_EMAIL_ADDRESS_SUCCESS = nameAction(namespace, 'SET_EMAIL_ADDRESS_SUCCESS');
export const SET_EMAIL_ADDRESS_FAILURE = nameAction(namespace, 'SET_EMAIL_ADDRESS_FAILURE');

export const SET_NAME = nameAction(namespace, 'SET_NAME');
export const SET_NAME_SUCCESS = nameAction(namespace, 'SET_NAME_SUCCESS');
export const SET_NAME_FAILURE = nameAction(namespace, 'SET_NAME_FAILURE');

export const SET_PASSPHRASE = nameAction(namespace, 'SET_PASSPHRASE');

export const SET_WALLET_ADDRESS = nameAction(namespace, 'SET_WALLET_ADDRESS');
export const SET_NODE_ADDRESS = nameAction(namespace, 'SET_NODE_ADDRESS');

const SET_ACCOUNT_LOADING = nameAction(namespace, 'SET_ACCOUNT_LOADING');
const SET_ACCOUNT_CREATED = nameAction(namespace, 'SET_ACCOUNT_CREATED');

const SET_APPLY_POOL_LOADING = nameAction(namespace, 'SET_APPLY_POOL_LOADING');
const SET_APPLICATION_SUCCESS = nameAction(namespace, 'SET_APPLICATION_SUCCESS');

export function setEmailAddressFailure(error) {
  return createAction(SET_EMAIL_ADDRESS_FAILURE, null, error);
}

export function setEmailAddressSuccess(email) {
  return createAction(SET_EMAIL_ADDRESS_SUCCESS, { email });
}

export function setNameFailure(error) {
  return createAction(SET_NAME_FAILURE, null, error);
}

export function setNameSuccess(name) {
  return createAction(SET_NAME_SUCCESS, { name });
}

export function setEmailAddressAndName(email, name) {
  return async (dispatch) => {
    if (email.indexOf('@') > 1) {
      dispatch(setEmailAddressSuccess(email));
    } else {
      dispatch(setEmailAddressFailure(new Error('Email is invalid')));
    }

    if (name) {
      dispatch(setNameSuccess(name));
    } else {
      dispatch(setNameFailure(new Error('Name is invalid')));
    }
  };
}

export function setPassphrase(passphrase) {
  return createAction(SET_PASSPHRASE, passphrase);
}

export function setWalletAddress(address) {
  return createAction(SET_WALLET_ADDRESS, { address });
}

export function validatePassphrase({passphraseValue, passphraseConfirmation}) {
  return passphraseValue && passphraseValue.length > 0 &&
    passphraseConfirmation && passphraseConfirmation.length > 0 &&
    passphraseValue === passphraseConfirmation;
}

function setIsLoading(accountCreationLoading) {
  return createAction(SET_ACCOUNT_LOADING, { accountCreationLoading });
}

function setAccountCreated(created) {
  return createAction(SET_ACCOUNT_CREATED, { created });
}

function setNodeAddress(nodeAddress) {
  return createAction(SET_NODE_ADDRESS, { nodeAddress });
}

function setApplicationLoading(applicationLoading) {
  return createAction(SET_APPLY_POOL_LOADING, { applicationLoading });
}

function setApplicationSuccess(poolId) {
  return createAction(SET_APPLICATION_SUCCESS, { success: true, poolId });
}

function createWallet(passphrase) {
  return postData(
    `${process.env.CONTROL_API}/keystore/wallet/create`,
    { passphrase }
  );
}

function createPGPKey(name, email) {
  return postData(
    `${process.env.CONTROL_API}/keystore/pgp/create`,
    { name, email }
  );
}

function createNode(passphrase) {
  if (mockData) {
    return delayed(() => {
      return {
        success: true,
        error: false
      };
    }, 3000);
  }

  return postData(
    `${process.env.CONTROL_API}/node/create`,
    {},
    { 'X-Authorization': passphrase }
  );

}

function setNodeData(nodeAddress, passphrase, body) {
  if (mockData) {
    return delayed(() => {
      return {
        success: true,
        error: false
      };
    }, 3000);
  }

  return postData(
    `${process.env.CONTROL_API}/node/${nodeAddress}/data`,
    body,
    { 'X-Authorization': passphrase }
  );
}

function applyToPool(walletAddress, poolId, passphrase) {
  return postData(
    `${process.env.CONTROL_API}/node/${walletAddress}/apply/${poolId}`,
    {},
    { 'X-Authorization': passphrase }
  );
}

function getNode() {
  return getJSON(`${process.env.CONTROL_API}/node`);
}

export function createApplication(poolId) {
  return async (dispatch, getState) => {
    const {
      passphrase,
      walletAddress
    } = getState().account;

    dispatch(setApplicationLoading(true));
    const result = await applyToPool(walletAddress, poolId, passphrase);
    dispatch(setApplicationLoading(false));

    if (result.error) {
      // Handle error
      return;
    }

    if (result.success) {
      return dispatch(setApplicationSuccess(poolId));
    }
  }
}

export function createAccount() {
  return async (dispatch, getState) => {
    const { account, expectedUsage } = getState();
    const { email, name, passphrase } = account;
    const {
      storageAmount,
      uploadSpeed,
      reason,
      uptimeStart,
      uptimeEnd,
      allDayUptime,
    } = expectedUsage;

    dispatch(setIsLoading(true));

    const wallet = await createWallet(passphrase);
    if (wallet.error) {
      throw new Error('Wallet creation failed!');
    }
    const walletAddress = wallet.response.address;

    await createPGPKey(name, email);
    await createNode(passphrase);
    const node = await getNode();
    const nodeAddress = node.response;

    await setNodeData(nodeAddress, passphrase, {
      name,
      email,
      passphrase,
      storageAmount,
      uploadSpeed,
      reason,
      uptimeStart,
      uptimeEnd,
      allDayUptime,
    });

    dispatch(setWalletAddress(walletAddress));
    dispatch(setNodeAddress(nodeAddress));
    dispatch(setAccountCreated(true));
    return dispatch(setIsLoading(false));
  }
}

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_EMAIL_ADDRESS:
      return {
        ...state,
        email: new LoadingState(state.email),
      };
    case SET_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
      };
    case SET_EMAIL_ADDRESS_FAILURE:
      return {
        ...state,
        email: new ErrorState(action.error),
      };
    case SET_NAME:
      return {
        ...state,
        name: new LoadingState(state.name),
      };
    case SET_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
      };
    case SET_NAME_FAILURE:
      return {
        ...state,
        name: new ErrorState(action.error),
      };
    case SET_PASSPHRASE:
      return {
        ...state,
        passphraseValue: action.payload.passphraseValue,
      };
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload.address,
      };
    case SET_NODE_ADDRESS:
      return {
        ...state,
        nodeAddress: action.payload.nodeAddress,
      };
    case SET_ACCOUNT_LOADING:
      return {
        ...state,
        accountCreationLoading: action.payload.accountCreationLoading,
      };
    case SET_ACCOUNT_CREATED:
      return {
        ...state,
        created: action.payload.created,
      };
    case SET_APPLY_POOL_LOADING:
      return {
        ...state,
        applyPoolLoading: action.payload.applyPoolLoading,
      };
    case SET_APPLICATION_SUCCESS:
      return {
        ...state,
        appliedToPool: action.payload.success,
      };
    default:
      return state;
  }
}
