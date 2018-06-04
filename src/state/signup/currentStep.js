import { push } from 'react-router-redux';
import { RESET_SIGNUP_STATE_SUCCESS } from './actions';
import { createAction, nameAction } from '../../util/createAction';

export const namespace = value => nameAction('signup', value);

export const SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS = namespace('SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS');

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

function getInitialState() {
  return {
    index: 0,
  };
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS:
      return { ...state, ...action.payload };
    case RESET_SIGNUP_STATE_SUCCESS:
      return getInitialState();
    default:
      return state;
  }
}
