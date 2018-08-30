import { nameAction } from '../../../util/createAction';

const namespace = 'wallet';

export const SET_PROCESSING_BALANCE = nameAction(namespace, 'SET_PROCESSING_BALANCE');
export const SET_WALLET_ADDRESS = nameAction(namespace, 'SET_WALLET_ADDRESS');

export const SET_WALLET_LOADING = nameAction(namespace, 'SET_WALLET_LOADING');

export const SET_GLA_BALANCE_LOADING = nameAction(namespace, 'SET_GLA_BALANCE_LOADING');
export const SET_GLA_BALANCE_SUCCESS = nameAction(namespace, 'SET_GLA_BALANCE_SUCCESS');
export const SET_ETH_BALANCE_SUCCESS = nameAction(namespace, 'SET_ETH_BALANCE_SUCCESS');

export const API_FETCH_BALANCE = nameAction(namespace, 'API_FETCH_BALANCE');
export const API_CREATE_WALLET = nameAction(namespace, 'API_CREATE_WALLET');
