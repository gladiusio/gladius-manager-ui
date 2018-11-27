import { createAction, createApiAction } from '../../../util/createAction';

import {
  SET_NETWORK_GATEWAY_RUNNING,
  SET_EDGED_RUNNING,
  SET_SHOW_ADVANCED,
  SET_SERVICE_LOGS,
  SET_OUTDATED_VERSION,
  SET_DISMISS_OUTDATED,
  APPEND_SERVICE_LOGS,
  API_NETWORK_GATEWAY_STATUS,
  API_EDGED_STATUS,
  API_START_SERVICE,
  API_SET_TIMEOUT,
  API_FETCH_LOGS,
  API_FETCH_OUTDATED_VERSION,
} from './types';

const serviceDispatchMap = {
  "network-gateway": setNetworkGatewayRunning,
  "edged": setEdgedRunning,
};

const connectionMap = {
  networkGateway: null,
  edged: null
};

function getOnMessage(service, dispatch) {
  return (event) => {
    const logs = event.data.split('\n');
    dispatch(appendToLogs(service, logs));
  };
}

export function startServices(services=['networkGateway', 'edged']) {
  return (dispatch) => {
    if (!services || services.length === 0) {
      return Promise.resolve();
    }

    return dispatch(createApiAction(API_SET_TIMEOUT, {}, {
      service: 'guardian',
      path: '/service/set_timeout',
      method: 'POST',
      body: {
        timeout: 3
      }
    })).then(() => {
      const startPromises = [];
      services.forEach((service) => {
        const serviceStart = dispatch(setServiceRunState(service, true));
        startPromises.push(serviceStart);
      });
      return Promise.all(startPromises);
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
    connectionMap[service].onerror = () => {
      dispatch(disconnectFromServiceLogs(service));
    }
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
      path: `/service/set_state/${service}`,
      method: 'PUT',
      body: {
        running: runState
      }
    }))
  }
}

export function fetchServiceStatuses() {
  return (dispatch) => {
    const networkGatewayFetch = dispatch(fetchNetworkGatewayStatus());
    const edgedFetch = dispatch(fetchEdgedStatus());

    return Promise.all([networkGatewayFetch, edgedFetch])
      .then((statusResponses) => {
        statusResponses.forEach((statusResponse) => {
          if (!statusResponse.success) {
            return;
          }

          Object.keys(statusResponse.response).forEach((service) => {
            const running = statusResponse.response[service].running
            dispatch(serviceDispatchMap[service](running));
          });
        });

        return statusResponses;
      });
  }
}

export function checkIfOutdated() {
  return (dispatch) => {
    return dispatch(fetchOutdatedServices())
      .then((responseInfo) => {
        if (!responseInfo.success) {
          return;
        }

        let outdated = false;
        Object.keys(responseInfo.response).forEach((service) => {
          if (responseInfo.response[service] != 0) {
            outdated = true;
          }
        });

        dispatch(setOutdatedVersion(outdated));
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

export function fetchNetworkGatewayStatus() {
  return (dispatch) => {
    return dispatch(createApiAction(API_NETWORK_GATEWAY_STATUS, {}, {
      service: 'guardian',
      path: '/service/stats/network-gateway',
    }));
  }
}

export function fetchEdgedStatus() {
  return (dispatch) => {
    return dispatch(createApiAction(API_EDGED_STATUS, {}, {
      service: 'guardian',
      path: '/service/stats/edged',
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

export function fetchOutdatedServices(service="all") {
  return (dispatch) => {
    return dispatch(createApiAction(API_FETCH_OUTDATED_VERSION, {}, {
      service: 'guardian',
      path: `/service/version/${service}`,
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

export function setNetworkGatewayRunning(running) {
  return createAction(SET_NETWORK_GATEWAY_RUNNING, {
    running,
  });
}

export function setEdgedRunning(running) {
  return createAction(SET_EDGED_RUNNING, {
    running,
  });
}

export function setShowAdvanced(showAdvanced) {
  return createAction(SET_SHOW_ADVANCED, {
    showAdvanced,
  });
}

export function setOutdatedVersion(isOutdated) {
  return createAction(SET_OUTDATED_VERSION, isOutdated);
}

export function dismissOutdated(dismiss=true) {
  return createAction(SET_DISMISS_OUTDATED, dismiss);
}
