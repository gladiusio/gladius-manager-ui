import {
  SET_TRANSACTION_FILTER,
  GET_ALL_TRANSACTIONS_ERROR,
  GET_ALL_TRANSACTIONS_SUCCESS
} from './types';

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
    transactions: payload.transactions || [],
  };
}

function reduceGetAllTransactionsError(state) {
  return {
    ...state,
    transactions: [],
  };
}

function getInitialState() {
  return {
    transactions: [],
    typeFilter: '',
  };
}

export default function transactionsReducer(state = getInitialState(), action = {}) {
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
