import {
  SET_EMAIL_ADDRESS,
  SET_EMAIL_ADDRESS_SUCCESS,
  SET_EMAIL_ADDRESS_FAILURE,
  SET_NAME,
  SET_NAME_SUCCESS,
  SET_NAME_FAILURE,
  SET_PASSPHRASE,
  SET_IP_ADDRESS,
  SET_APPLY_POOL_LOADING,
} from './types';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_EMAIL_ADDRESS:
      return {
        ...state,
        email: new LoadingState(state.email),
      };
    case SET_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
      };
    case SET_EMAIL_ADDRESS_FAILURE:
      return {
        ...state,
        email: new ErrorState(action.error),
      };
    case SET_NAME:
      return {
        ...state,
        name: new LoadingState(state.name),
      };
    case SET_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
      };
    case SET_NAME_FAILURE:
      return {
        ...state,
        name: new ErrorState(action.error),
      };
    case SET_PASSPHRASE:
      return {
        ...state,
        passphraseValue: action.payload.passphraseValue,
      };
    case SET_IP_ADDRESS:
      return {
        ...state,
        ip: action.payload.ip,
      };
    case SET_APPLY_POOL_LOADING:
      return {
        ...state,
        applyPoolLoading: action.payload.applyPoolLoading,
      };
    default:
      return state;
  }
}
