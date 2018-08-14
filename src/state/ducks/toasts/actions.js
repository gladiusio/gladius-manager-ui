import { createAction } from '../../../util/createAction';
import {
  ADD_TOAST,
  REMOVE_TOAST
} from './types';

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
