import test from 'tape';
import * as toastActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.length, 0, 'sets toasts to an empty array');
  t.end();
});

test('Toasts - addToast', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(toastActions.addToast({ text: 'Hello World', success: true }))
  );

  t.strictEqual(state[0].text, 'Hello World', 'sets the text of the toast');
  t.strictEqual(state[0].success, true, 'sets the type of the toast');
  t.end();
});

test('Toasts - removeToast', (t) => {
  let state = reducer([
    { text: 'Hello World', success: true },
    { text: 'Test Warning', warning: true }
  ]);
  state = reducer(
    state,
    createTestAction(toastActions.removeToast('Hello World'))
  );

  t.equals(state.length, 1, 'there should be only 1 toast after removing');
  t.equals(state[0].text, 'Test Warning', 'the remaining toast should not be the removed toast');
  t.end();
});
