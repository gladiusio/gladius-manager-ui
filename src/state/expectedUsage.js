import { createAction, nameAction } from '../util/createAction';

const namespace = 'expectedUsage';

export const SET_EXPECTED_USAGE = nameAction(namespace, 'SET_EXPECTED_USAGE');
export const SET_STORAGE_AMOUNT = nameAction(namespace, 'SET_STORAGE_AMOUNT');
export const SET_UPLOAD_SPEED = nameAction(namespace, 'SET_UPLOAD_SPEED');
export const SET_REASON = nameAction(namespace, 'SET_REASON');
export const SET_UPTIME_START = nameAction(namespace, 'SET_UPTIME_START');
export const SET_UPTIME_END = nameAction(namespace, 'SET_UPTIME_END');
export const TOGGLE_ALL_DAY_UPTIME = nameAction(namespace, 'TOGGLE_ALL_DAY_UPTIME');

export function setStorageAmount(storageAmount) {
  return createAction(SET_STORAGE_AMOUNT, { storageAmount });
}

export function setUploadSpeed(uploadSpeed) {
  return createAction(SET_UPLOAD_SPEED, { uploadSpeed });
}
export function setReason(reason) {
  return createAction(SET_REASON, { reason });
}
export function setUptimeStart(uptimeStart) {
  return createAction(SET_UPTIME_START, { uptimeStart });
}
export function setUptimeEnd(uptimeEnd) {
  return createAction(SET_UPTIME_END, { uptimeEnd });
}
export function toggleAllDayUptime() {
  return createAction(TOGGLE_ALL_DAY_UPTIME);
}

export function validExpectedUsage(expectedUsage) {
  return expectedUsage.uploadSpeed !== undefined &&
    expectedUsage.reason &&
    expectedUsage.uptimeStart !== undefined &&
    expectedUsage.uptimeEnd !== undefined &&
    expectedUsage.allDayUptime !== undefined;
}

export function setExpectedUsage(expectedUsage) {
  return createAction(SET_EXPECTED_USAGE, expectedUsage)
}

function getInitialState() {
  return {
    storageAmount: 200,
    uploadSpeed: 1,
    reason: undefined,
    uptimeStart: 900,
    uptimeEnd: 1800,
    allDayUptime: false,
  };
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_EXPECTED_USAGE:
      return action.payload;
    case SET_STORAGE_AMOUNT:
      return {
        ...state,
        storageAmount: action.payload.storageAmount,
      };
    case SET_UPLOAD_SPEED:
      return {
        ...state,
        uploadSpeed: action.payload.uploadSpeed,
      };
    case SET_REASON:
      return {
        ...state,
        reason: action.payload.reason,
      };
    case SET_UPTIME_START:
      return {
        ...state,
        uptimeStart: action.payload.uptimeStart,
      };
    case SET_UPTIME_END:
      return {
        ...state,
        uptimeEnd: action.payload.uptimeEnd,
      };
    case TOGGLE_ALL_DAY_UPTIME:
      return {
        ...state,
        allDayUptime: !state.allDayUptime,
      };
    default:
      return state;
  }
}
