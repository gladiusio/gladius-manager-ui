import test from 'tape';
import { createAction } from '../createAction';

test('createAction', (t) => {
  t.deepEqual({
    type: 'honk',
    payload: {
      key: 'value',
    },
  }, createAction('honk', {
    key: 'value',
  }), 'creates a correctly formatted non-error action');

  t.deepEqual({
    type: 'honk',
    payload: {
      key: 'value',
    },
    error: true,
  }, createAction('honk', {
    key: 'value',
  }, true), 'creates a correctly formatted error action');

  t.end();
});
