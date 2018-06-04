import getPath from 'lodash.get';
import assert from './assert';
import { createAction, nameAction } from './createAction';

export function formField(edited = false, value = '', defaultValue = '', errorMessage = null) {
  return {
    edited,
    value,
    defaultValue,
    errorMessage,
    _isFormField: true,
  };
}

function cloneField(field) {
  return formField(field.edited, field.value, field.defaultValue, field.errorMessage);
}

function isField(state, name) {
  /* eslint no-underscore-dangle: "off" */
  return (state && state[name] && state[name]._isFormField) === true;
}

function assertIsField(state, name) {
  assert(
    isField(state, name),
    `${name} is not a valid form field.`,
  );
}

export function updateAction(namespace) {
  const updateActionName = nameAction(namespace, 'FORM__UPDATE_FIELD');
  const ret = (name, value, additionalData = {}) => createAction(updateActionName, {
    name,
    value,
    ...additionalData,
  });
  ret.ACTION_NAME = updateActionName;
  return ret;
}


export function failAction(namespace) {
  const failActionName = nameAction(namespace, 'FORM__FAIL_FIELD');
  const ret = (name, errorMessage, additionalData = {}) => createAction(failActionName, {
    name,
    errorMessage,
    ...additionalData,
  });
  ret.ACTION_NAME = failActionName;
  return ret;
}

export function validateAction(namespace, stateFinder) {
  const validateActionName = nameAction(namespace, 'FORM__VALIDATE_FIELDS');
  const normStateFinder = typeof stateFinder === 'function' ? stateFinder : state => getPath(state, stateFinder);

  const ret = (fields, additionalData = {}) => (dispatch, getState) => {
    const normFields = Array.isArray(fields) ? fields : [fields];

    dispatch(createAction(validateActionName, {
      fields: normFields,
      ...additionalData,
    }));

    const newState = normStateFinder(getState(), fields, additionalData);
    let valid = true;

    for (let i = 0; i < normFields.length; i += 1) {
      const key = normFields[i];
      if (isField(newState, key) && newState[key].errorMessage) {
        valid = false;
        break;
      }
    }

    return valid;
  };
  ret.ACTION_NAME = validateActionName;
  return ret;
}

function updateField(state, payload) {
  const { name, value } = payload;
  assertIsField(state, name);
  const newField = cloneField(state[name]);
  newField.value = value;
  newField.edited = true;
  newField.errorMessage = '';

  return {
    ...state,
    [name]: newField,
  };
}

function failField(state, payload) {
  const { name, errorMessage } = payload;
  assertIsField(state, name);
  const newField = cloneField(state[name]);
  newField.errorMessage = errorMessage;

  return {
    ...state,
    [name]: newField,
  };
}

function validateFields(validators, state, payload) {
  const { fields } = payload;
  let newState = state;
  fields.forEach((f) => {
    const validator = validators[f];
    assert(typeof validator === 'function', `No validator for field ${f}.`);
    const errorMessage = validator(state[f].value, state);

    if (errorMessage) {
      newState = failField(newState, {
        name: f,
        errorMessage,
      });
    }
  });

  return newState;
}

export function formReducer(namespace, validators = {}) {
  const updateActionName = nameAction(namespace, 'FORM__UPDATE_FIELD');
  const failActionName = nameAction(namespace, 'FORM__FAIL_FIELD');
  const validateActionName = nameAction(namespace, 'FORM__VALIDATE_FIELDS');

  return (state = {}, action = {}) => {
    switch (action.type) {
      case updateActionName:
        return updateField(state, action.payload);
      case failActionName:
        return failField(state, action.payload);
      case validateActionName:
        return validateFields(validators, state, action.payload);
      default:
        return state;
    }
  };
}
