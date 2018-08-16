export function validExpectedUsage(expectedUsage) {
  return expectedUsage.estimatedSpeed !== undefined &&
    expectedUsage.bio;
    // expectedUsage.uptimeStart !== undefined &&
    // expectedUsage.uptimeEnd !== undefined &&
    // expectedUsage.allDayUptime !== undefined;
}
