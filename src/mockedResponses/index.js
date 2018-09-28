import applications, { match as applicationsMatch } from './applications';
import balance, { match as balanceMatch } from './balance';
import createAccount, { match as createAccountMatch } from './createAccount';
import transactions, { match as transactionsMatch } from './transactions';
import pools, { match as poolsMatch } from './pools';
import keystoreAccount, { match as keystoreAccountMatch } from './keystoreAccount';
import controldStatus, { match as controldStatusMatch } from './controldStatus';
import networkdStatus, { match as networkdStatusMatch } from './networkdStatus';
import defaultResponse from './default';

const endpoints = [
  { match: applicationsMatch, response: applications },
  { match: createAccountMatch, response: createAccount },
  { match: balanceMatch, response: balance },
  { match: transactionsMatch, response: transactions },
  { match: poolsMatch, response: pools },
  { match: keystoreAccountMatch, response: keystoreAccount },
  { match: controldStatusMatch, response: controldStatus },
  { match: networkdStatusMatch, response: networkdStatus },
];

export function getMockedResponse(path) {
  for(let i = 0; i < endpoints.length; i++) {
    let endpoint = endpoints[i];
    if (endpoint.match(path)) {
      return endpoint.response;
    }
  }

  return defaultResponse;
}
