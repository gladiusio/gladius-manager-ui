import { createAction } from '../../../util/createAction';
import {
  SET_EXPECTED_USAGE,
  SET_STORAGE_AMOUNT,
  SET_ESTIMATED_SPEED,
  SET_REASON,
  SET_UPTIME_START,
  SET_UPTIME_END,
  TOGGLE_ALL_DAY_UPTIME
} from './types';

export function setStorageAmount(storageAmount) {
  return createAction(SET_STORAGE_AMOUNT, { storageAmount });
}

export function setEstimatedSpeed(estimatedSpeed) {
  return createAction(SET_ESTIMATED_SPEED, { estimatedSpeed });
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

export function setExpectedUsage(expectedUsage) {
  return createAction(SET_EXPECTED_USAGE, expectedUsage)
}
