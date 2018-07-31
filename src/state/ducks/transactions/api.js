import mockedTransactionsResponse from '../../../mockedResponses/transactions';
import { getJSON, postData, delayed } from '../../../backend';

const mockData = process.env.MOCK_DATA === "true";

export function fetchTransactions(walletAddress) {
  if (mockData) {
    return delayed(() => {
      return mockedTransactionsResponse;
    }, 2000);
  }

  return async (dispatch) => {
    return dispatch(createApiAction(API_FETCH_TRANSACTIONS, {}, {
      path: `/account/${walletAddress}/transactions`,
      method: 'POST',
    }));
  };
}
