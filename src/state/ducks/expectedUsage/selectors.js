export function validExpectedUsage(expectedUsage) {
  return expectedUsage.estimatedSpeed !== undefined &&
    expectedUsage.bio;
}
