export function validExpectedUsage(expectedUsage) {
  return expectedUsage.estimatedSpeed !== undefined &&
    expectedUsage.bio;
}

export function getExpectedUsage(obj) {
  const expectedUsage = {};
  if (obj !== null && typeof obj === 'object') {
    ['bio', 'estimatedSpeed'].forEach((key) => {
      if (key in obj) {
        expectedUsage[key] = obj[key];
      }
    });
  }

  return expectedUsage;
}

export function getBio(state) {
  return state.expectedUsage.bio;
}

export function getEstimatedSpeed(state) {
  return state.expectedUsage.estimatedSpeed;
}

export function getAllDayUptime(state) {
  return state.expectedUsage.allDayUptime;
}

export function getUptimeStart(state) {
  return state.expectedUsage.uptimeStart;
}

export function getUptimeEnd(state) {
  return state.expectedUsage.uptimeEnd;
}

export function getStorageAmount(state) {
  return state.expectedUsage.storageAmount;
}
