import { createAction, nameAction } from '../../../util/createAction';

const namespace = 'signup';

export const TOGGLE_POOL = nameAction(namespace, 'TOGGLE_POOL');
export const REMOVE_TOAST = nameAction(namespace, 'REMOVE_TOAST');
export const SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS = nameAction(
  namespace,
  'SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS'
);
