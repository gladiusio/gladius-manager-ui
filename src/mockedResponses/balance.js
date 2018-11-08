export default {
  message: "null",
  success: true,
  error: "",
  response: {
    value: 10215000000000,
    balanceType: 1,
    formattedBalance: {
      value: 102150,
      symbol: "GLA",
      name: "Gladius"
    }
  },
  txHash: null,
  endpoint: "/api/account/0x481a92f2c9d5e88932dcc731deb1e6d376b3a07c/balance/gla"
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
    pathFragments[2] === 'balance' &&
    pathFragments[1] && pathFragments[3];
}
