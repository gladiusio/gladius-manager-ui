export function getWalletAddress(state) {
  return state.wallet.walletAddress;
}

export function getEthBalance(state) {
  return state.wallet.ethBalance;
}

export function getGlaBalance(state) {
  return state.wallet.glaBalance;
}

export function getWalletLoading(state) {
  return state.wallet.walletLoading;
}
