import { combineReducers } from 'redux';

export { default as applications } from './ducks/applications';
export { default as account } from './account';
export { default as expectedUsage } from './expectedUsage';
export { default as pools } from './ducks/pools';
export { default as toasts } from './toasts';
export { default as transactions } from './ducks/transactions';
export { default as wallet } from './wallet';
export { default as authorization } from './authorization';
export { reducer as form } from 'redux-form';

import currentStep from './signup/currentStep';
import poolIds from './signup/poolIds';
import steps from './signup/steps';

export const signup = combineReducers({
  currentStep,
  poolIds,
  steps,
});
