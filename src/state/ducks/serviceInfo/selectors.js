import { serviceNameMap } from './constants';

export function getNetworkGatewayRunning(state) {
  return state.serviceInfo.networkGatewayRunning;
}

export function getEdgedRunning(state) {
  return state.serviceInfo.edgedRunning;
}

export function getAllServicesRunning(state) {
  return getNetworkGatewayRunning(state) && getEdgedRunning(state);
}

export function getServiceStatuses(state) {
  return [
    {name: serviceNameMap.networkGateway, status: getNetworkGatewayRunning(state) ? 'running' : 'down', id: 'network-gateway' },
    {name: serviceNameMap.edged, status: getEdgedRunning(state) ? 'running' : 'down', id: 'edged' },
  ];
}

export function getPortStatuses(state) {
  return [
    {name: 'Your Node', status: 'na'},
  ];
}

export function getShowAdvanced(state) {
  return state.serviceInfo.showAdvanced;
}

export function getLogs(state, service) {
  const logs = state.serviceInfo.logs[service];
  if (!logs) {
    return [];
  }

  return logs;
}

export function getServiceName(state, service) {
  return serviceNameMap[service];
}

export function getNonRunningServices(responses) {
  const nonRunningServices = [];
  responses.forEach((response) => {
    Object.keys(response.response).forEach((service) => {
      if (!response.response[service].running) {
        nonRunningServices.push(service);
      }
    });
  });

  return nonRunningServices;
}

export function getIsOutdatedVersion(state) {
  return state.serviceInfo.outdatedVersion && !state.serviceInfo.dismissOutdated;
}
