import { nameAction } from '../../../util/createAction';

const namespace = 'pools';

export const SORT_POOLS = nameAction(namespace, 'SORT_POOLS');
export const GET_ALL_POOLS_ERROR = nameAction(namespace, 'GET_ALL_POOLS_ERROR');
export const GET_ALL_POOLS_SUCCESS = nameAction(namespace, 'GET_ALL_POOLS_SUCCESS');
export const SET_LOCATION_FILTER = nameAction(namespace, 'SET_LOCATION_FILTER');
export const SET_RATING_FILTER = nameAction(namespace, 'SET_RATING_FILTER');
export const SET_NODE_COUNT_FILTER = nameAction(namespace, 'SET_NODE_COUNT_FILTER');
export const SET_EARNINGS_FILTER = nameAction(namespace, 'SET_EARNINGS_FILTER');
export const API_GET_POOLS = nameAction(namespace, 'API_GET_POOLS');
