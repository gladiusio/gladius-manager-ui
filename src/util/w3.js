function w3Manager() {
  const subscribers = new Set();
  let w3 = null;
  let started = false;

  function flush() {
    subscribers.forEach(sub => sub(w3));
    subscribers.clear();
  }

  function pollWeb3() {
    if (typeof window.web3 === 'undefined') {
      setTimeout(pollWeb3, 5000);
      return;
    }

    w3 = new window.Web3(window.web3.currentProvider);
    flush();
  }

  return {
    withW3(cb) {
      if (w3) {
        setImmediate(() => cb(w3));
        return;
      }

      subscribers.add(cb);
    },
    getW3() {
      return w3;
    },
    start() {
      if (started) {
        return;
      }

      started = true;
      setImmediate(pollWeb3);
    },
  };
}

module.exports = w3Manager();
module.exports.factory = w3Manager;
