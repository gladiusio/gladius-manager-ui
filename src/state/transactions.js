import sortBy from 'lodash.sortby';
import { nameAction, createAction } from '../util/createAction';
import Market from '../util/contracts/market';
import Pool from '../util/contracts/pool';
import { getJSON, postData, delayed } from '../backend';
import mockedTransactionsResponse from './mockedResponses/transactions';

const mockData = process.env.MOCK_DATA === "true";
const namespace = 'transactions';

const SET_TRANSACTION_FILTER = nameAction(namespace, 'SET_TRANSACTION_FILTER');
const GET_ALL_TRANSACTIONS_ERROR = nameAction(namespace, 'GET_ALL_TRANSACTIONS_ERROR');
const GET_ALL_TRANSACTIONS_SUCCESS = nameAction(namespace, 'GET_ALL_TRANSACTIONS_SUCCESS');

function getInitialState() {
  return {
    transactions: [],
    typeFilter: '',
  };
}

function fetchTransactions(walletAddress) {
  if (mockData) {
    return delayed(() => {
      return mockedTransactionsResponse;
    }, 2000);
  }

  return postData(
    `${process.env.CONTROL_API}/account/${walletAddress}/transactions`
  );
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
      const transactions = await fetchTransactions(walletAddress);
      if (transactions.error) {
        return dispatch(getAllTransactionsError(transactions.error));
      }

      return dispatch(getAllTransactionsSuccess(transactions.response));
    } catch (err) {
      return dispatch(getAllTransactionsError(err));
    }
  }
}

function reduceSetTransactionType(state, payload) {
  const { type } = payload;
  return {
    ...state,
    typeFilter: type,
  };
}

function reduceGetAllTransactionsSuccess(state, payload) {
  return {
    ...state,
    transactions: payload.transactions,
  };
}

function reduceGetAllTransactionsError(state) {
  return {
    ...state,
    transactions: [],
  };
}

export default function poolReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_TRANSACTION_FILTER:
      return reduceSetTransactionType(state, action.payload);
    case GET_ALL_TRANSACTIONS_SUCCESS:
      return reduceGetAllTransactionsSuccess(state, action.payload);
    case GET_ALL_TRANSACTIONS_ERROR:
      return reduceGetAllTransactionsError(state, action.payload);
    default:
      return state;
  }
}
