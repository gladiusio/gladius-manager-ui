import { combineReducers } from 'redux';

export { default as account } from './account';
export { default as onboarding } from './onboarding';
export { default as expectedUsage } from './expectedUsage';
export { default as pools } from './pools';
export { reducer as form } from 'redux-form';

import currentStep from './signup/currentStep';
import poolId from './signup/poolId';
import steps from './signup/steps';

export const signup = combineReducers({
  currentStep,
  poolId,
  steps,
});
