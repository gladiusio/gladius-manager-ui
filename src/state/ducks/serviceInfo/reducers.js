import {
  SET_CONTROLD_RUNNING,
  SET_NETWORKD_RUNNING,
  SET_SHOW_ADVANCED,
  SET_SERVICE_LOGS,
  APPEND_SERVICE_LOGS,
} from './types';

function getInitialState() {
  return {
    controldRunning: false,
    networkdRunning: false,
    showAdvanced: false,
    logs: {
      controld: [],
      networkd: [],
    }
  };
}

export default function serviceInfoReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_CONTROLD_RUNNING:
      return {
        ...state,
        controldRunning: action.payload.running,
      };
    case SET_NETWORKD_RUNNING:
      return {
        ...state,
        networkdRunning: action.payload.running,
      };
    case SET_SHOW_ADVANCED:
      return {
        ...state,
        showAdvanced: action.payload.showAdvanced,
      };
    case SET_SERVICE_LOGS:
      return {
        ...state,
        logs: {
          ...state.logs,
          [action.payload.service]: action.payload.logs
        }
      };
    case APPEND_SERVICE_LOGS:
      const { service, logs } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          [service]: state.logs[service].concat(logs)
        }
      };
    default:
      return state;
  }
}
