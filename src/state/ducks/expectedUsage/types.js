import { createAction, nameAction } from '../../../util/createAction';

const namespace = 'expectedUsage';

export const SET_EXPECTED_USAGE = nameAction(namespace, 'SET_EXPECTED_USAGE');
export const SET_STORAGE_AMOUNT = nameAction(namespace, 'SET_STORAGE_AMOUNT');
export const SET_ESTIMATED_SPEED = nameAction(namespace, 'SET_ESTIMATED_SPEED');
export const SET_REASON = nameAction(namespace, 'SET_REASON');
export const SET_UPTIME_START = nameAction(namespace, 'SET_UPTIME_START');
export const SET_UPTIME_END = nameAction(namespace, 'SET_UPTIME_END');
export const TOGGLE_ALL_DAY_UPTIME = nameAction(namespace, 'TOGGLE_ALL_DAY_UPTIME');
