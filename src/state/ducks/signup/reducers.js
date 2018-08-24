import {
  TOGGLE_POOL,
  REMOVE_TOAST,
  SET_CURRENT_SIGNUP_STEP_INDEX_SUCCESS,
  SET_APPLICATION_SUCCESS,
  SET_WALLET_SUCCESS,
  REMOVE_POOL
} from './types';
import {
  API_STATUS_CODE_NO_WALLET
} from '../../middlewares/apiService';

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
    appliedToPool: false,
    walletCreated: false,
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

function reduceRemovePool(poolId, state) {
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
    case REMOVE_POOL:
      return {
        ...state,
        poolIds: reduceTogglePool(action.payload.poolId, state)
      };
    case SET_APPLICATION_SUCCESS:
      return {
        ...state,
        appliedToPool: action.payload.success,
      };
    case SET_WALLET_SUCCESS:
      return {
        ...state,
        walletCreated: action.payload.walletCreated,
      };
    case API_STATUS_CODE_NO_WALLET:
      return getInitialState();
    default:
      return state;
  }
}

