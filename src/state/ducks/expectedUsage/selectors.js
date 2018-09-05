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
