import { isFunction, echo } from '../util/utilFunctions';

export default function createTestAction (action, state={}) {
  if (isFunction(action)) {
    return action(echo, () => state);
  }

  return action;
}
