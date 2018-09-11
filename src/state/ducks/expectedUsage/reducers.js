import {
  SET_EXPECTED_USAGE
} from './types';

function getInitialState() {
  return {
    storageAmount: 200,
    estimatedSpeed: 1,
    bio: undefined,
    uptimeStart: 800,
    uptimeEnd: 1800,
    allDayUptime: false,
  };
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_EXPECTED_USAGE:
      return action.payload;
    default:
      return state;
  }
}
