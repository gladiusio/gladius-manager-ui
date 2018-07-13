import { RESET_SIGNUP_STATE_SUCCESS } from './actions';
import { createAction, nameAction } from '../../util/createAction';

export const namespace = value => nameAction('signup', value);

export const TOGGLE_POOL = namespace('TOGGLE_POOL');

export function toggleSelectedPool(poolId) {
  return createAction(TOGGLE_POOL, { poolId })
}

function getInitialState() {
  return [];
}

function reduceTogglePool(poolId, state) {
  if (state.indexOf(poolId) === -1) {
    return [
      ...state,
      poolId,
    ];
  }

  return state.filter(pool => pool !== poolId);
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case TOGGLE_POOL:
      return reduceTogglePool(action.payload.poolId, state);
    case RESET_SIGNUP_STATE_SUCCESS:
      return getInitialState();
    default:
      return state;
  }
}
