import assert from './assert';

export function step(max, value) {
  return {
    max,
    value,
  };
}

export default function stepFunction(...steps) {
  steps.reduce((acc, curr) => {
    assert(
      curr.max > acc,
      `Steps must non-overlapping and be in ascending order. Prev step: ${acc}. Curr step: ${curr}`,
    );
    return curr.max;
  }, Number.MIN_SAFE_INTEGER);

  return point => steps.find(s => s.max > point).value;
}
