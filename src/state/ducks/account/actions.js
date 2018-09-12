import { createAction, createApiAction } from '../../../util/createAction';
import { captureError } from '../../../util/logger';
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
        captureError('Pool application failed', {
          email,
          name,
          bio,
          estimatedSpeed,
          poolIds: application.error
        }, 'debug');
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
