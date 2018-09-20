import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import Select from '../select';

function render(props) {
  const el = (
    <Select {...props}>
      <option value="1">Test 1</option>
      <option value="2">Test 2</option>
    </Select>
  );

  return mount(el);
}

test('Select - with no error message', (t) => {
  const wrapper = render();
  t.equal(wrapper.find('.is-invalid').length, 0, 'has no invalid class');
  t.equal(wrapper.find('.invalid-feedback').length, 0, 'does not render error message');
  t.equal(wrapper.find('option').length, 2, 'renders options');
  t.end();
});

test('Select - with an error message', (t) => {
  const msg = 'honk';
  const wrapper = render({
    errorMessage: msg,
  });

  t.strictEqual(wrapper.find('.is-invalid').length, 1, 'has invalid class');
  t.strictEqual(wrapper.find('.invalid-feedback').text(), msg, 'renders error message');
  t.equal(wrapper.find('option').length, 2, 'renders options');
  t.end();
});

test('Select - passes additional props to the input', (t) => {
  const wrapper = render({
    errorMessage: 'honk',
    className: 'falafel',
  });

  const select = wrapper.find('select');

  t.ok(select.hasClass('falafel'), 'adds new names');
  t.ok(select.hasClass('form-control') && select.hasClass('is-invalid'), 'keeps existing class names');
  t.equal(wrapper.find('option').length, 2, 'renders options');
  t.end();
});
