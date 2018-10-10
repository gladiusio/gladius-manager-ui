import { createAction, createApiAction } from '../../../util/createAction';

import {
  SET_CONTROLD_RUNNING,
  SET_NETWORKD_RUNNING,
  SET_SHOW_ADVANCED,
  SET_SERVICE_LOGS,
  APPEND_SERVICE_LOGS,
  API_CONTROLD_STATUS,
  API_NETWORKD_STATUS,
  API_START_SERVICE,
  API_SET_TIMEOUT,
  API_FETCH_LOGS
} from './types';

const serviceDispatchMap = {
  controld: setControldRunning,
  networkd: setNetworkdRunning,
};

const connectionMap = {
  controld: null,
  networkd: null
};

function getOnMessage(service, dispatch) {
  return (event) => {
    console.log(event);
    const logs = event.data.split('\n');
    dispatch(appendToLogs(service, logs));
  };
}

export function startServices() {
  return (dispatch) => {
    return dispatch(createApiAction(API_SET_TIMEOUT, {}, {
      service: 'guardian',
      path: 'service/set_timeout',
      method: 'POST',
      body: {
        timeout: 3
      }
    })).then(() => {
      const controldStart = dispatch(setServiceRunState('controld', true));
      const networkdStart = dispatch(setServiceRunState('networkd', true));
      return Promise.all([controldStart, networkdStart]);
    });
  };
}

export function connectToServiceLogs(service) {
  return (dispatch) => {
    if (connectionMap[service]) {
      return;
    }

    connectionMap[service] = new WebSocket(
      `ws://localhost:7791/service/ws/logs/${service}`
    );
    connectionMap[service].onmessage = getOnMessage(service, dispatch);
  };
}

export function disconnectFromServiceLogs(service) {
  return (dispatch) => {
    if (!connectionMap[service]) {
      return;
    }

    connectionMap[service].close && connectionMap[service].close();
    delete connectionMap[service];
  }
}

export function setServiceRunState(service, runState) {
  return (dispatch) => {
    return dispatch(createApiAction(API_START_SERVICE, {}, {
      service: 'guardian',
      path: `service/set_state/${service}`,
      method: 'PUT',
      body: {
        running: runState
      }
    }))
  }
}

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

export function fetchStartingLogs() {
  return (dispatch) => {
    return dispatch(fetchLogs())
      .then((response) => {
        if (!response.success) {
          return;
        }

        const logsMap = response.response;
        Object.keys(logsMap).forEach((service) => {
          dispatch(setLogs(service, logsMap[service]));
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

export function fetchLogs() {
  return (dispatch) => {
    return dispatch(createApiAction(API_FETCH_LOGS, {}, {
      service: 'guardian',
      path: '/service/logs',
    }));
  }
}

export function setLogs(service, logs) {
  return createAction(SET_SERVICE_LOGS, {
    service,
    logs
  });
}

export function appendToLogs(service, logs) {
  return createAction(APPEND_SERVICE_LOGS, {
    service,
    logs
  });
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

export function setShowAdvanced(showAdvanced) {
  return createAction(SET_SHOW_ADVANCED, {
    showAdvanced,
  });
}
