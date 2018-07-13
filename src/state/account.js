import { createAction, nameAction } from '../util/createAction';
import { ErrorState, LoadingState } from '../util/stateValues';
import { getJSON, postData, delayed } from '../backend';

function wait(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}

async function waitForTransaction(txHash) {
  while (true) {
    let request = await getTransactionStatus(txHash);
    if (request.response.complete && request.response.status) {
      return request;
    }
    await wait(1000);
  }
}

async function getTransactionStatus(txHash) {
  if (mockData) {
    await wait(1000);
    return {
      response: {
        complete: true,
        status: true,
      }
    };
  }
  return getJSON(`${process.env.CONTROL_API}/status/tx/${txHash}`);
}

const namespace = 'account';
const mockData = process.env.MOCK_DATA === "true";

export const SET_EMAIL_ADDRESS = nameAction(namespace, 'SET_EMAIL_ADDRESS');
export const SET_EMAIL_ADDRESS_SUCCESS = nameAction(namespace, 'SET_EMAIL_ADDRESS_SUCCESS');
export const SET_EMAIL_ADDRESS_FAILURE = nameAction(namespace, 'SET_EMAIL_ADDRESS_FAILURE');

export const SET_NAME = nameAction(namespace, 'SET_NAME');
export const SET_NAME_SUCCESS = nameAction(namespace, 'SET_NAME_SUCCESS');
export const SET_NAME_FAILURE = nameAction(namespace, 'SET_NAME_FAILURE');

export const SET_PASSPHRASE = nameAction(namespace, 'SET_PASSPHRASE');
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

export function validatePassphrase({passphraseValue, passphraseConfirmation}) {
  return passphraseValue && passphraseValue.length > 0 &&
    passphraseConfirmation && passphraseConfirmation.length > 0 &&
    passphraseValue === passphraseConfirmation;
}

function setAccountLoading(accountCreationLoading) {
  return createAction(SET_ACCOUNT_LOADING, { accountCreationLoading });
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

function setApplicationSuccess(poolIds) {
  return createAction(SET_APPLICATION_SUCCESS, { success: true, poolIds });
}

function createNode(passphrase) {
  if (mockData) {
    return delayed(() => {
      return {
        txHash: { value: '0x8392141904' },
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
        txHash: { value: '0x3012093812038' },
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
        txHash: {
          value: '0x92312312',
        },
      };
    }, 3000);
  }

  return postData(
    `${process.env.CONTROL_API}/node/${walletAddress}/apply/${poolId}`,
    {},
    { 'X-Authorization': passphrase }
  );
}

function getNode(walletAddress) {
  if (mockData) {
    return delayed(() => {
      return {
        response: {address: 'mynodeaddress'}
      };
    });
  }
  return getJSON(`${process.env.CONTROL_API}/node/`);
}

export function createApplications(poolIds) {
  return async (dispatch, getState) => {
    const {
      passphraseValue,
      nodeAddress
    } = getState().account;
    let applicationSuccessful = false;

    async function applyToPools(poolIds) {
      for(var i = 0; i < poolIds.length; i++) {
        let result = await applyToPool(
          nodeAddress,
          poolIds[i],
          passphraseValue
        );
        if (result.success) {
          applicationSuccessful = true;
          await waitForTransaction(result.txHash.value);
        }
      }
    }

    dispatch(setApplicationLoading(true));
    await applyToPools(poolIds);
    dispatch(setApplicationLoading(false));

    if (applicationSuccessful) {
      return dispatch(setApplicationSuccess(poolIds));
    }
  }
}

export function setUserNodeData() {
  return async (dispatch, getState) => {
    const { account, expectedUsage, wallet } = getState();
    const { email, name, passphraseValue, nodeAddress } = account;
    const { walletAddress } = wallet;
    const {
      storageAmount,
      uploadSpeed,
      reason,
      uptimeStart,
      uptimeEnd,
      allDayUptime,
    } = expectedUsage;

    const setNode = await setNodeData(nodeAddress, passphraseValue, {
      name,
      email,
      passphrase: passphraseValue,
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

    await waitForTransaction(setNode.txHash.value);

    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export function getNodeInfo() {
  return async (dispatch, getState) => {
    const { walletAddress } = getState().wallet;
    const nodeRequest = await getNode(walletAddress);

    return new Promise((resolve, reject) => {
      if (nodeRequest.error) {
        reject(nodeRequest.error);
      }

      const nodeAddress = nodeRequest.response.address;

      if (
        nodeRequest.response.data &&
        nodeRequest.response.data.email &&
        nodeRequest.response.data.name
      ) {
        dispatch(setAccountCreated(true));
      }
      dispatch(setNodeAddress(nodeAddress));
      resolve(nodeAddress);
    })
  }
}

export function createAccount() {
  return async (dispatch, getState) => {
    let accountCreationFailure = false;
    dispatch(setAccountLoading(true));

    async function createUserNode() {
      const { account, wallet } = getState();
      const { passphraseValue } = account;
      const { walletAddress } = wallet;

      const nodeCreation = await createNode(passphraseValue);
      if (nodeCreation.error) {
        throw new Error('Node creation failed!');
      }

      await waitForTransaction(nodeCreation.txHash.value);

      return dispatch(getNodeInfo()).then(() => {
        return dispatch(setUserNodeData()).then(() => {
          dispatch(setAccountCreated(true));
        });
      }, () => {
        accountCreationFailure = true;
      });
    }

    try {
      await createUserNode();
    } catch(e) {
      console.log(e);
      accountCreationFailure = true;
    }
    dispatch(setAccountLoading(false));

    return new Promise((resolve, error) => {
      if (accountCreationFailure) {
        error();
      } else {
        resolve();
      }
    });
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
