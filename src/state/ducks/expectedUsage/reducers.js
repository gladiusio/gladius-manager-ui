import {
  SET_EXPECTED_USAGE,
  SET_STORAGE_AMOUNT,
  SET_ESTIMATED_SPEED,
  SET_REASON,
  SET_UPTIME_START,
  SET_UPTIME_END,
  TOGGLE_ALL_DAY_UPTIME
} from './types';

function getInitialState() {
  return {
    storageAmount: 200,
    estimatedSpeed: 1,
    reason: undefined,
    uptimeStart: 800,
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
    case SET_ESTIMATED_SPEED:
      return {
        ...state,
        estimatedSpeed: action.payload.estimatedSpeed,
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
