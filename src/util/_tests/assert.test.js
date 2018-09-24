import test from 'tape';
import assert, { AssertionError } from '../assert';

test('assert', (t) => {
  t.throws(() => assert(false), AssertionError, 'throws AssertionError on false');
  t.doesNotThrow(() => assert(true), AssertionError, 'does not throw AssertionError on true');
  const msg = 'beep';
  t.throws(() => assert(false, msg), new RegExp(msg), 'includes message');
  t.throws(() => assert('not boolean'), AssertionError, 'throws AssertionError on non-boolean values');
  t.end();
});
