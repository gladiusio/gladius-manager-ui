import test from 'tape';
import bemify from '../bemify';

test('bemify', (t) => {
  const bem = bemify('test-block');
  t.equal(bem(), 'test-block', 'called without element or modifier returns block');
  t.equal(bem('test-element'), 'test-block__test-element', 'called without modifier returns block and element');
  t.equal(
    bem('test-element', 'test-modifier'),
    'test-block__test-element--test-modifier',
    'called with everything returns everything',
  );
  t.equal(
    bem('', 'modifier'),
    'test-block--modifier',
    'called with just modifier returns modifier',
  );
  t.end();
});
