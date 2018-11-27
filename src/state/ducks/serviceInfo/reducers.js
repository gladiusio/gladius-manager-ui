import {
  SET_NETWORK_GATEWAY_RUNNING,
  SET_EDGED_RUNNING,
  SET_SHOW_ADVANCED,
  SET_SERVICE_LOGS,
  SET_OUTDATED_VERSION,
  SET_DISMISS_OUTDATED,
  APPEND_SERVICE_LOGS,
} from './types';

function getInitialState() {
  return {
    networkGatewayRunning: false,
    edgedRunning: false,
    showAdvanced: false,
    logs: {
      networkGateway: [],
      edged: [],
    },
    outdatedVersion: false,
    dismissOutdated: false,
  };
}

export default function serviceInfoReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_NETWORK_GATEWAY_RUNNING:
      return {
        ...state,
        networkGatewayRunning: action.payload.running,
      };
    case SET_EDGED_RUNNING:
      return {
        ...state,
        edgedRunning: action.payload.running,
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
    case SET_OUTDATED_VERSION:
      return {
        ...state,
        outdatedVersion: action.payload,
      };
    case SET_DISMISS_OUTDATED:
      return {
        ...state,
        dismissOutdated: action.payload,
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
