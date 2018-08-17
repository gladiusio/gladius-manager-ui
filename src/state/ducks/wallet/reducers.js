import {
  SET_PROCESSING_BALANCE,
  SET_WALLET_ADDRESS,
  SET_WALLET_LOADING,
  SET_GLA_BALANCE_LOADING,
  SET_GLA_BALANCE_SUCCESS,
  SET_ETH_BALANCE_SUCCESS,
} from './types';

function reduceSetProcessingBalance(state, payload) {
  return {
    ...state,
    processingBalance: payload.balance,
  };
}

function getInitialState() {
  return {
    walletAddress: null,
    ethBalance: null,
    glaBalance: null,
    walletLoading: false,
  };
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SET_PROCESSING_BALANCE:
      return reduceSetProcessingBalance(state, action.payload);
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload.address,
      };
    case SET_WALLET_LOADING:
      return {
        ...state,
        walletLoading: action.payload.walletLoading,
      };
    case SET_GLA_BALANCE_LOADING:
      return {
        ...state,
        glaBalanceLoading: action.payload.glaBalanceLoading,
      };
    case SET_GLA_BALANCE_SUCCESS:
      return {
        ...state,
        glaBalance: action.payload.glaBalance,
      };
    case SET_ETH_BALANCE_SUCCESS:
      return {
        ...state,
        ethBalance: action.payload.ethBalance,
      };
    default:
      return state;
  }
}
