import { createAction, createApiAction } from '../../../util/createAction';
import mockedTransactionsResponse from '../../../mockedResponses/transactions';
import { delayed } from '../../../backend';
import {
  API_FETCH_TRANSACTIONS,
  SET_TRANSACTION_FILTER,
  GET_ALL_TRANSACTIONS_ERROR,
  GET_ALL_TRANSACTIONS_SUCCESS
} from './types';

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

export function getAllTransactionsError(error) {
  return async dispatch => dispatch(createAction(GET_ALL_TRANSACTIONS_ERROR, {
    error,
  }));
}

export function getAllTransactionsSuccess(transactions) {
  return async dispatch => dispatch(createAction(GET_ALL_TRANSACTIONS_SUCCESS, {
    transactions,
  }));
}

export function setFilterType(type) {
  return createAction(SET_TRANSACTION_FILTER, {
    type,
  });
}

export function getAllTransactions() {
  return async (dispatch, getState) => {
    const { walletAddress } = getState().wallet;
    if (!walletAddress) {
      return dispatch(getAllTransactionsError(err));
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
