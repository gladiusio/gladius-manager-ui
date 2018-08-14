import { nameAction } from '../../../util/createAction';
const namespace = 'transactions';

export const SET_TRANSACTION_FILTER = nameAction(namespace, 'SET_TRANSACTION_FILTER');
export const GET_ALL_TRANSACTIONS_ERROR = nameAction(namespace, 'GET_ALL_TRANSACTIONS_ERROR');
export const GET_ALL_TRANSACTIONS_SUCCESS = nameAction(namespace, 'GET_ALL_TRANSACTIONS_SUCCESS');
export const API_FETCH_TRANSACTIONS = nameAction(namespace, 'API_FETCH_TRANSACTIONS');
