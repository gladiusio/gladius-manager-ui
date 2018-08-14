import {
  TOGGLE_POOL,
  REMOVE_TOAST,
  SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS
} from './types';

const steps = [{
  path: '/signup/getting-started',
  name: 'Your information',
}, {
  path: '/signup/get-secure',
  name: 'Protect your data',
}, {
  path: '/signup/choose-pool',
  name: 'Choose pool',
}];

function getInitialState() {
  return {
    currentStep: {
      index: 0,
    },
    poolIds: [],
    steps: {
      all: steps,
      byPath: steps.reduce((acc, step, index) => ({
        ...acc,
        [step.path]: index,
      }), {}),
    },
  };
}

function reduceTogglePool(poolId, state) {
  if (state.poolIds.indexOf(poolId) === -1) {
    return [
      ...state.poolIds,
      poolId,
    ];
  }

  return state.poolIds.filter(pool => pool !== poolId);
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS:
      return {
        ...state,
        currentStep: {
          ...action.payload,
        },
      };
    case TOGGLE_POOL:
      return {
        ...state,
        poolIds: reduceTogglePool(action.payload.poolId, state)
      };
    default:
      return state;
  }
}

