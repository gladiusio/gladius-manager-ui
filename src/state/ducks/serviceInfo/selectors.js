import { serviceNameMap } from './constants';

export function getControldRunning(state) {
  return state.serviceInfo.controldRunning;
}

export function getNetworkdRunning(state) {
  return state.serviceInfo.networkdRunning;
}

export function getAllServicesRunning(state) {
  return getControldRunning(state) && getNetworkdRunning(state);
}

export function getServiceStatuses(state) {
  return [
    {name: serviceNameMap.controld, status: getControldRunning(state) ? 'running' : 'down', id: 'controld' },
    {name: serviceNameMap.networkd, status: getNetworkdRunning(state) ? 'running' : 'down', id: 'networkd' },
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
