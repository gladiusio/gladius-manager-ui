import {
  ADD_TOAST,
  REMOVE_TOAST
} from './types';

function getInitialState() {
  return [];
}

function reduceAddToast(state, payload) {
  if (state.indexOf(payload) > -1) {
    return state;
  }

  return [
    payload,
    ...state,
  ];
}

function reduceRemoveToast(state, payload) {
  return state.filter(toast => toast.text !== payload.text);
}

export default function toastReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case ADD_TOAST:
      return reduceAddToast(state, action.payload);
    case REMOVE_TOAST:
      return reduceRemoveToast(state, action.payload);
    default:
      return state;
  }
}
