export function getSignupPoolIds(state) {
  return state.signup.poolIds;
}

export function getAppliedToPool(state) {
  return state.signup.appliedToPool;
}

export function getWalletCreated(state) {
  return state.signup.walletCreated;
}

export function getSignupCurrentIndex(state) {
  return state.signup.currentStep.index;
}

export function getSignupSteps(state) {
  return state.signup.steps.all;
}

export function getSignupStepsPath(state) {
  return state.signup.steps.byPath;
}
