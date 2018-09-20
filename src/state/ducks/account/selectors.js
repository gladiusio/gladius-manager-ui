export function validatePassphrase({passphraseValue, passphraseConfirmation}) {
  return passphraseValue && passphraseValue.length > 0 &&
    passphraseConfirmation && passphraseConfirmation.length > 0 &&
    passphraseValue === passphraseConfirmation;
}

export function getEmail(state) {
  return state.account.email;
}

export function getName(state) {
  return state.account.name;
}

export function getApplyPoolLoading(state) {
  return state.account.applyPoolLoading;
}

export function getIp(state) {
  return state.account.ip;
}

export function getPassphrase(state) {
  return state.account.passphraseValue;
}
