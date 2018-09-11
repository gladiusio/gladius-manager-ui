import test from 'tape';
import * as expectedUsageActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.estimatedSpeed, 1);
  t.equals(state.bio, undefined);
  t.end();
});

test('ExpectedUsage - setExpectedUsage', (t) => {
  let state = reducer();
  let testExpectedUsage = {
    estimatedSpeed: 55,
    bio: 'Test test test',
  };
  state = reducer(
    state,
    createTestAction(expectedUsageActions.setExpectedUsage(testExpectedUsage))
  );

  t.strictEqual(state, testExpectedUsage, 'sets the expected usage');
  t.end();
});
