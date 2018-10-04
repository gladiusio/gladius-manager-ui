export function getControldRunning(state) {
  return state.serviceInfo.controldRunning;
}

export function getNetworkdRunning(state) {
  return state.serviceInfo.networkdRunning;
}

export function getAllServicesRunning(state) {
  return getControldRunning(state) && getNetworkdRunning(state);
}
