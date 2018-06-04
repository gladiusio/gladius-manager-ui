export function installW3() {
  window.web3 = {
    currentProvider: 'provider',
  };

  const eth = {
    accounts: [],
  };

  window.Web3 = function Web3(p) {
    this.provider = p;
    this.eth = eth;
    return this;
  };

  return {
    eth,
  };
}

export function uninstallW3() {
  delete window.web3;
  delete window.Web3;
}
