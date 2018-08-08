export function validExpectedUsage(expectedUsage) {
  return expectedUsage.estimatedSpeed !== undefined &&
    expectedUsage.reason;
    // expectedUsage.uptimeStart !== undefined &&
    // expectedUsage.uptimeEnd !== undefined &&
    // expectedUsage.allDayUptime !== undefined;
}
