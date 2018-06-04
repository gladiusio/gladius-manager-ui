import { formField, formReducer, updateAction, validateAction } from '../util/reduxForm';

const namespace = 'onboarding';

const validators = {
  email(value) {
    return value.indexOf('@') > -1 ? null : 'Please enter a valid e-mail.';
  },
  name(value) {
    return value ? null : 'Please enter a valid name.';
  },
};

const INSTALL_STATECHART = {};

function stateActor(name, next) {
  INSTALL_STATECHART[name] = next;
  return name;
}

stateActor('EMAIL', () => 'EMAIL');

function getInitialState() {
  return {
    email: formField(),
    name: formField(),
  };
}

export const updateField = updateAction(namespace);

export const validateFields = validateAction(namespace, 'onboarding');

const form = formReducer(namespace, validators);

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    default:
      return form(state, action);
  }
}
