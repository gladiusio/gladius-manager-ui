import { nameAction, createAction } from '../util/createAction';

const namespace = 'toasts';

const ADD_TOAST = nameAction(namespace, 'ADD_TOAST');
const REMOVE_TOAST = nameAction(namespace, 'REMOVE_TOAST');

function getInitialState() {
  return [];
}

export function addToast(options = {}) {
  return (dispatch) => {
    const { text } = options;
    if (text) {
      setTimeout(() => {
        dispatch(removeToast(text));
      }, 5000);
    }

    return dispatch(createAction(ADD_TOAST, {
      ...options,
    }));
  }
}

export function removeToast(text) {
  return createAction(REMOVE_TOAST, {
    text,
  });
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
