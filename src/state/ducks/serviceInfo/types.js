import { nameAction } from '../../../util/createAction';

const namespace = 'serviceInfo';

export const SET_CONTROLD_RUNNING = nameAction(namespace, 'SET_CONTROLD_RUNNING');
export const SET_NETWORKD_RUNNING = nameAction(namespace, 'SET_NETWORKD_RUNNING');

export const API_CONTROLD_STATUS = nameAction(namespace, 'API_CONTROLD_STATUS');
export const API_NETWORKD_STATUS = nameAction(namespace, 'API_NETWORKD_STATUS');
