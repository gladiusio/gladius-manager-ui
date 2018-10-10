import { nameAction } from '../../../util/createAction';

const namespace = 'serviceInfo';

export const SET_CONTROLD_RUNNING = nameAction(namespace, 'SET_CONTROLD_RUNNING');
export const SET_NETWORKD_RUNNING = nameAction(namespace, 'SET_NETWORKD_RUNNING');
export const SET_SHOW_ADVANCED = nameAction(namespace, 'SET_SHOW_ADVANCED');
export const SET_SERVICE_LOGS = nameAction(namespace, 'SET_SERVICE_LOGS');
export const APPEND_SERVICE_LOGS = nameAction(namespace, 'APPEND_SERVICE_LOGS');

export const API_CONTROLD_STATUS = nameAction(namespace, 'API_CONTROLD_STATUS');
export const API_NETWORKD_STATUS = nameAction(namespace, 'API_NETWORKD_STATUS');
export const API_START_SERVICE = nameAction(namespace, 'API_START_SERVICE');
export const API_SET_TIMEOUT = nameAction(namespace, 'API_SET_TIMEOUT');
export const API_FETCH_LOGS = nameAction(namespace, 'API_FETCH_LOGS');
