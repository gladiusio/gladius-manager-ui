export default {
  "message": null,
  "success": true,
  "error": null,
  "response": [
    {
      "hash": "0x7663fEE3390C93f4e09a52F7C09680Af7C6591Es",
      "type": "withdraw",
      "timeStamp": 1531159430,
    },
    {
      "hash": "0x7663fEE3390C93f4e09a52F7C09680Af7C6591Ez",
      "type": "apply",
      "timeStamp": 1531159430,
    },
    {
      "hash": "0x7663fEE3390C93f4e09a52F7C09680Af7C6591Eb",
      "type": "settings",
      "timeStamp": 1531159430,
    },
    {
      "hash": "0x7663fEE3390C93f4e09a52F7C09680Af7C6591Ea",
      "type": "contract",
      "timeStamp": 1531159430,
    },
    {
      "hash": "0x7663fEE3390C93f4e09a52F7C09680Af7C6591Ec",
      "type": "deposit",
      "timeStamp": 1531159430,
    },
  ],
  "endpoint": "/api/market/transactions/gla"
}

export function match(path) {
  if (!path) {
    return false;
  }

  if (path[0] === '/') {
    path = path.slice(1);
  }

  const pathFragments = path.split('/');
  return pathFragments[0] === 'account' &&
    pathFragments[2] === 'transactions' &&
    pathFragments[1];
}
