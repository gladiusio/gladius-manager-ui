import { nameAction } from '../../../util/createAction';

const namespace = 'serviceInfo';

export const SET_NETWORK_GATEWAY_RUNNING = nameAction(namespace, 'SET_NETWORK_GATEWAY_RUNNING');
export const SET_EDGED_RUNNING = nameAction(namespace, 'SET_EDGED_RUNNING');
export const SET_SHOW_ADVANCED = nameAction(namespace, 'SET_SHOW_ADVANCED');
export const SET_SERVICE_LOGS = nameAction(namespace, 'SET_SERVICE_LOGS');
export const APPEND_SERVICE_LOGS = nameAction(namespace, 'APPEND_SERVICE_LOGS');

export const API_NETWORK_GATEWAY_STATUS = nameAction(namespace, 'API_NETWORK_GATEWAY_STATUS');
export const API_EDGED_STATUS = nameAction(namespace, 'API_EDGED_STATUS');
export const API_START_SERVICE = nameAction(namespace, 'API_START_SERVICE');
export const API_SET_TIMEOUT = nameAction(namespace, 'API_SET_TIMEOUT');
export const API_FETCH_LOGS = nameAction(namespace, 'API_FETCH_LOGS');
