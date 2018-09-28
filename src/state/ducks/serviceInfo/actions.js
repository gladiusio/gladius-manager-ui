import { createAction, createApiAction } from '../../../util/createAction';

import {
  SET_CONTROLD_RUNNING,
  SET_NETWORKD_RUNNING,
  API_CONTROLD_STATUS,
  API_NETWORKD_STATUS,
} from './types';

const serviceDispatchMap = {
  controld: setControldRunning,
  networkd: setNetworkdRunning,
};

export function fetchServiceStatuses() {
  return (dispatch) => {
    const controldFetch = dispatch(fetchControldStatus());
    const networkdFetch = dispatch(fetchNetworkdStatus());

    return Promise.all([controldFetch, networkdFetch])
      .then((statusResponses) => {
        statusResponses.forEach((statusResponse) => {
          if (!statusResponse.success) {
            return;
          }

          Object.keys(statusResponse.response).forEach((service) => {
            const running = statusResponse.response[service].running;
            dispatch(serviceDispatchMap[service](running));
          });
        });
      });
  }
}

export function fetchControldStatus() {
  return (dispatch) => {
    return dispatch(createApiAction(API_CONTROLD_STATUS, {}, {
      service: 'guardian',
      path: '/service/stats/controld',
    }));
  }
}

export function fetchNetworkdStatus() {
  return (dispatch) => {
    return dispatch(createApiAction(API_NETWORKD_STATUS, {}, {
      service: 'guardian',
      path: '/service/stats/networkd',
    }));
  }
}

export function setControldRunning(running) {
  return createAction(SET_CONTROLD_RUNNING, {
    running,
  });
}

export function setNetworkdRunning(running) {
  return createAction(SET_NETWORKD_RUNNING, {
    running,
  });
}
