import applications, { match as applicationsMatch } from './applications';
import balance, { match as balanceMatch } from './balance';
import createAccount, { match as createAccountMatch } from './createAccount';
import transactions, { match as transactionsMatch } from './transactions';
import pools, { match as poolsMatch } from './pools';
import keystoreAccount, { match as keystoreAccountMatch } from './keystoreAccount';
import networkGatewayStatus, { match as networkGatewayStatusMatch } from './networkGatewayStatus';
import edgedStatus, { match as edgedStatusMatch } from './edgedStatus';
import versions, { match as versionsMatch } from './versions';
import defaultResponse from './default';

const endpoints = [
  { match: applicationsMatch, response: applications },
  { match: createAccountMatch, response: createAccount },
  { match: balanceMatch, response: balance },
  { match: transactionsMatch, response: transactions },
  { match: poolsMatch, response: pools },
  { match: keystoreAccountMatch, response: keystoreAccount },
  { match: networkGatewayStatusMatch, response: networkGatewayStatus },
  { match: edgedStatusMatch, response: edgedStatus },
  { match: versionsMatch, response: versions },
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
