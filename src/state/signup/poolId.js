import { RESET_SIGNUP_STATE_SUCCESS } from './actions';
import { createAction, nameAction } from '../../util/createAction';

export const namespace = value => nameAction('signup', value);

export const CHOOSE_POOL_SUCCESS = namespace('CHOOSE_POOL_SUCCESS');

function choosePoolSuccess(poolId) {
  return createAction(CHOOSE_POOL_SUCCESS, { poolId });
}

export function choosePool(poolId) {
  return async (dispatch) => {
    dispatch(choosePoolSuccess(poolId));
  };
}

function getInitialState() {
  return null;
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case CHOOSE_POOL_SUCCESS:
      return action.payload.poolId;
    case RESET_SIGNUP_STATE_SUCCESS:
      return getInitialState();
    default:
      return state;
  }
}
