import { createAction, nameAction } from '../../../util/createAction';

const namespace = 'signup';

export const TOGGLE_POOL = nameAction(namespace, 'TOGGLE_POOL');
export const REMOVE_POOL = nameAction(namespace, 'REMOVE_POOL');
export const SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS = nameAction(
  namespace,
  'SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS'
);
export const SET_APPLICATION_SUCCESS = nameAction(namespace, 'SET_APPLICATION_SUCCESS');
export const SET_WALLET_SUCCESS = nameAction(namespace, 'SET_WALLET_SUCCESS');
