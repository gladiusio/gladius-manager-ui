import {
  SET_CONTROLD_RUNNING,
  SET_NETWORKD_RUNNING,
} from './types';

function getInitialState() {
  return {
    controldRunning: false,
    networkdRunning: false
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
    default:
      return state;
  }
}
