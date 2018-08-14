import { push } from 'react-router-redux';
import { createAction } from '../../../util/createAction';
import {
  TOGGLE_POOL,
  REMOVE_TOAST,
  SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS
} from './types';

function setCurrentSignupStepIndexSuccess(index) {
  return createAction(SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS, { index });
}

export function setCurrentSignupStepIndex(index) {
  return async (dispatch, getState) => {
    const { signup } = getState();
    await dispatch(setCurrentSignupStepIndexSuccess(index));
    return dispatch(push(signup.steps.all[index].path));
  };
}

export function nextSignupStep() {
  return async (dispatch, getState) => {
    const { signup } = getState();
    await dispatch(setCurrentSignupStepIndex(signup.currentStep.index + 1));
  };
}

export function prevSignupStep() {
  return async (dispatch, getState) => {
    const { signup } = getState();
    await dispatch(setCurrentSignupStepIndex(signup.currentStep.index - 1));
  };
}

export function toggleSelectedPool(poolId) {
  return createAction(TOGGLE_POOL, { poolId })
}
