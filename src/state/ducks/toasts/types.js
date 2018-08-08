import { nameAction } from '../../../util/createAction';

const namespace = 'toasts';

export const ADD_TOAST = nameAction(namespace, 'ADD_TOAST');
export const REMOVE_TOAST = nameAction(namespace, 'REMOVE_TOAST');
