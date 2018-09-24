import { createAction, createApiAction } from '../../../util/createAction';
import mockedTransactionsResponse from '../../../mockedResponses/transactions';
import { delayed } from '../../../backend';
import { walletSelectors } from '../wallet';
import {
  API_FETCH_TRANSACTIONS,
  SET_TRANSACTION_FILTER,
  GET_ALL_TRANSACTIONS_ERROR,
  GET_ALL_TRANSACTIONS_SUCCESS
} from './types';

const { getWalletAddress } = walletSelectors;

export function fetchTransactions(walletAddress) {
  return async (dispatch) => {
    return dispatch(createApiAction(API_FETCH_TRANSACTIONS, {}, {
      path: `/account/${walletAddress}/transactions`,
      method: 'POST',
    }));
  };
}

export function getAllTransactionsError(error) {
  return createAction(GET_ALL_TRANSACTIONS_ERROR, {
    error,
  });
}

export function getAllTransactionsSuccess(transactions) {
  return createAction(GET_ALL_TRANSACTIONS_SUCCESS, {
    transactions,
  });
}

export function setFilterType(type) {
  return createAction(SET_TRANSACTION_FILTER, {
    type,
  });
}

export function getAllTransactions() {
  return async (dispatch, getState) => {
    const walletAddress = getWalletAddress(getState());
    if (!walletAddress) {
      return dispatch(getAllTransactionsError());
    }

    try {
      const transactions = await dispatch(fetchTransactions(walletAddress));

      if (transactions.error) {
        return dispatch(getAllTransactionsError(transactions.error));
      }
      return dispatch(getAllTransactionsSuccess(transactions.response));
    } catch (err) {
      return dispatch(getAllTransactionsError(err));
    }
  }
}
