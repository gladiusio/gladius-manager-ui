import {
  SET_EMAIL_ADDRESS,
  SET_EMAIL_ADDRESS_SUCCESS,
  SET_EMAIL_ADDRESS_FAILURE,
  SET_NAME,
  SET_NAME_SUCCESS,
  SET_NAME_FAILURE,
  SET_PASSPHRASE,
  SET_NODE_ADDRESS,
  SET_IP_ADDRESS,
  SET_ACCOUNT_LOADING,
  SET_ACCOUNT_CREATED,
  SET_ACCOUNT_INFO_SAVED,
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
    case SET_NODE_ADDRESS:
      return {
        ...state,
        nodeAddress: action.payload.nodeAddress,
      };
    case SET_IP_ADDRESS:
      return {
        ...state,
        ip: action.payload.ip,
      };
    case SET_ACCOUNT_LOADING:
      return {
        ...state,
        accountCreationLoading: action.payload.accountCreationLoading,
      };
    case SET_ACCOUNT_CREATED:
      return {
        ...state,
        accountCreated: action.payload.accountCreated,
      };
    case SET_ACCOUNT_INFO_SAVED:
      return {
        ...state,
        accountInfoSaved: action.payload.accountInfoSaved,
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
