import { createAction, nameAction } from '../util/createAction';
import { ErrorState, LoadingState } from '../util/stateValues';
import { getJSON, postData, delayed } from '../backend';

const namespace = 'account';
const mockData = process.env.MOCK_DATA === "true";

export const SET_EMAIL_ADDRESS = nameAction(namespace, 'SET_EMAIL_ADDRESS');
export const SET_EMAIL_ADDRESS_SUCCESS = nameAction(namespace, 'SET_EMAIL_ADDRESS_SUCCESS');
export const SET_EMAIL_ADDRESS_FAILURE = nameAction(namespace, 'SET_EMAIL_ADDRESS_FAILURE');

export const SET_NAME = nameAction(namespace, 'SET_NAME');
export const SET_NAME_SUCCESS = nameAction(namespace, 'SET_NAME_SUCCESS');
export const SET_NAME_FAILURE = nameAction(namespace, 'SET_NAME_FAILURE');

export const SET_PASSPHRASE = nameAction(namespace, 'SET_PASSPHRASE');

export const SET_WALLET_ADDRESS = nameAction(namespace, 'SET_WALLET_ADDRESS');
export const SET_NODE_ADDRESS = nameAction(namespace, 'SET_NODE_ADDRESS');

const SET_WALLET_LOADING = nameAction(namespace, 'SET_WALLET_LOADING');
const SET_WALLET_SUCCESS = nameAction(namespace, 'SET_WALLET_SUCCESS');

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

function setAccountLoading(accountCreationLoading) {
  return createAction(SET_ACCOUNT_LOADING, { accountCreationLoading });
}

function setWalletIsLoading(walletLoading) {
  return createAction(SET_WALLET_LOADING, { walletLoading });
}

function setWalletSuccess(walletCreated) {
  return createAction(SET_WALLET_SUCCESS, { walletCreated });
}

function setAccountCreated(accountCreated) {
  return createAction(SET_ACCOUNT_CREATED, { accountCreated });
}

function setNodeAddress(nodeAddress) {
  return createAction(SET_NODE_ADDRESS, { nodeAddress });
}

function setApplicationLoading(applyPoolLoading) {
  return createAction(SET_APPLY_POOL_LOADING, { applyPoolLoading });
}

function setApplicationSuccess(poolId) {
  return createAction(SET_APPLICATION_SUCCESS, { success: true, poolId });
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
    `${process.env.CONTROL_API}/keystore/wallet/account/create`,
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
  if (mockData) {
    return delayed(() => {
      return {
        success: true,
        error: false
      };
    }, 3000);
  }

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

export function createUserWallet() {
  return async (dispatch, getState) => {
    async function createWalletAndKey(passphrase) {
      const wallet = await createWallet(passphrase);
      if (wallet.error) {
        throw new Error('Wallet creation failed!');
      }
      const walletAddress = wallet.response.address;

      const pgp = await createPGPKey(name, email);
      if (pgp.error) {
        throw new Error('PGP key creation failed!');
      }

      dispatch(setWalletSuccess(true));
      dispatch(setWalletAddress(walletAddress));
    }

    const { account } = getState();
    const { email, name, passphraseValue } = account;

    dispatch(setWalletIsLoading(true));
    createWalletAndKey(passphraseValue);
    dispatch(setWalletIsLoading(false));
  };
}

export function createAccount() {
  return async (dispatch, getState) => {
    dispatch(setAccountLoading(true));

    async function createUserNode() {
      const { account, expectedUsage } = getState();
      const { email, name, passphraseValue } = account;

      const {
        storageAmount,
        uploadSpeed,
        reason,
        uptimeStart,
        uptimeEnd,
        allDayUptime,
      } = expectedUsage;

      const nodeCreation = await createNode(passphraseValue);
      if (nodeCreation.error) {
        throw new Error('Node creation failed!');
      }
      const node = await getNode();
      const nodeAddress = node.response;

      const setNode = await setNodeData(nodeAddress, passphraseValue, {
        name,
        email,
        passphraseValue,
        storageAmount,
        uploadSpeed,
        reason,
        uptimeStart,
        uptimeEnd,
        allDayUptime,
      });
      if (setNode.error) {
        throw new Error('Setting node data failed!');
      }

      dispatch(setNodeAddress(nodeAddress));
      dispatch(setAccountCreated(true));
    }

    await createUserNode();
    return dispatch(setAccountLoading(false));
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
    case SET_ACCOUNT_LOADING:
      return {
        ...state,
        accountCreationLoading: action.payload.accountCreationLoading,
      };
    case SET_ACCOUNT_CREATED:
      return {
        ...state,
        accountCreated: action.payload.accountCreated,
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
