import { createAction, createApiAction } from '../../../util/createAction';
import { getJSON, postData, delayed } from '../../../backend';
import { toastActions } from '../toasts';
import { signupActions } from '../signup';
import { poolsActions } from '../pools';
import {
  SET_EMAIL_ADDRESS,
  SET_EMAIL_ADDRESS_SUCCESS,
  SET_EMAIL_ADDRESS_FAILURE,
  SET_NAME,
  SET_NAME_SUCCESS,
  SET_NAME_FAILURE,
  SET_PASSPHRASE,
  SET_NODE_ADDRESS,
  SET_IP_ADDRESS,
  SET_ACCOUNT_LOADING,
  SET_ACCOUNT_CREATED,
  SET_ACCOUNT_INFO_SAVED,
  SET_APPLY_POOL_LOADING,
  API_SET_NODE_DATA,
} from './types';

const { setApplicationSuccess } = signupActions;
const { addToast } = toastActions;
const { applyToPool } = poolsActions;

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

export function setIPAddress(ipData) {
  return createAction(SET_IP_ADDRESS, { ip: ipData.ip });
}

export function setAccountLoading(accountCreationLoading) {
  return createAction(SET_ACCOUNT_LOADING, { accountCreationLoading });
}

export function setAccountCreated(accountCreated) {
  return createAction(SET_ACCOUNT_CREATED, { accountCreated });
}

export function setAccountInfoSaved(accountInfoSaved) {
  return createAction(SET_ACCOUNT_INFO_SAVED, { accountInfoSaved });
}

export function setNodeAddress(nodeAddress) {
  return createAction(SET_NODE_ADDRESS, { nodeAddress });
}

export function setApplicationLoading(applyPoolLoading) {
  return createAction(SET_APPLY_POOL_LOADING, { applyPoolLoading });
}

export function setNodeData(nodeAddress, passphrase, body) {
  return async (dispatch) => {
    return await dispatch(createApiAction(API_SET_NODE_DATA, {}, {
      path: `/node/${nodeAddress}/data`,
      method: 'POST',
      body,
      headers: { 'X-Authorization': passphrase },
    }));
  };
}

export function getNode(walletAddress) {
  return getJSON(`${process.env.CONTROL_API}/node/`);
}

export function createApplications(poolIds) {
  return async (dispatch, getState) => {
    const { account, expectedUsage } = getState();
    const {
      email,
      name
    } = account;
    const {
      bio,
      estimatedSpeed,
    } = expectedUsage;

    async function applyToPools(poolIds) {
      const result = { success: [], error: [] };
      for(var i = 0; i < poolIds.length; i++) {
        let application = await dispatch(applyToPool(
          poolIds[i],
          {
            email,
            name,
            bio,
            estimatedSpeed,
          }
        ));

        if (application && application.error) {
          result.error.push(poolIds[i]);
        } else {
          result.success.push(poolIds[i]);
        }
      }

      return result;
    }

    return new Promise(async (resolve, reject) => {
      dispatch(setApplicationLoading(true));
      const application = await applyToPools(poolIds);
      dispatch(setApplicationLoading(false));

      if (application && application.error.length) {
        dispatch(addToast({
          text: 'There was a problem applying to the pools. Please try again later.',
          warning: true,
        }));
        return reject();
      }

      dispatch(addToast({
        text: 'You have successfully applied to a pool!',
        success: true,
      }));
      dispatch(setApplicationSuccess(poolIds));
      resolve();
    });
  }
}

export function setUserNodeData() {
  return async (dispatch, getState) => {
    const { account, expectedUsage, wallet } = getState();
    const { email, name, passphraseValue, nodeAddress, ip } = account;
    const { walletAddress } = wallet;
    const {
      storageAmount,
      estimatedSpeed,
      bio,
      uptimeStart,
      uptimeEnd,
      allDayUptime,
    } = expectedUsage;

    return new Promise(async (resolve, reject) => {
      const setNode = await dispatch(setNodeData(nodeAddress, passphraseValue, {
        name,
        email,
        passphrase: passphraseValue,
        storageAmount,
        estimatedSpeed,
        bio,
        uptimeStart,
        uptimeEnd,
        allDayUptime,
        ip,
      }));

      if (setNode.error) {
        return reject();
      }

      await waitForTransaction(setNode.txHash.value);
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
      const nodeData = nodeRequest.response.data;
      if (nodeData) {
        if (nodeData.email && nodeData.name) {
          dispatch(setAccountCreated(true));
          dispatch(setEmailAddressAndName(nodeData.email, nodeData.name));
        }

        if (nodeData.ip) {
          dispatch(setIPAddress(nodeData.ip));
        }
      }
      dispatch(setNodeAddress(nodeAddress));
      resolve(nodeAddress);
    })
  }
}
