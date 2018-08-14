import { nameAction } from '../../../util/createAction';

const namespace = 'authorization';

export const SET_UNAUTHORIZED = nameAction(namespace, 'SET_UNAUTHORIZED');
export const RESET_UNAUTHORIZED = nameAction(namespace, 'RESET_UNAUTHORIZED');
export const SET_HAS_ACCOUNT = nameAction(namespace, 'SET_HAS_ACCOUNT');

export const API_OPEN_WALLET = nameAction(namespace, 'API_OPEN_WALLET');
export const API_FETCH_ACCOUNT = nameAction(namespace, 'API_FETCH_ACCOUNT');
