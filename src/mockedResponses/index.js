import applications, { match as applicationsMatch } from './applications';
import balance, { match as balanceMatch } from './balance';
import createAccount, { match as createAccountMatch } from './createAccount';
import transactions, { match as transactionsMatch } from './transactions';
import defaultResponse from './default';

const endpoints = [
  { match: applicationsMatch, response: applications },
  { match: createAccountMatch, response: createAccount },
  { match: balanceMatch, response: balance },
  { match: transactionsMatch, response: transactions },
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
