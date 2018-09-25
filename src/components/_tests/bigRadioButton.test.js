import test from 'tape';
import { mount } from 'enzyme';
import React from 'react';
import BigRadioButton from '../bigRadioButton';

function check(t, isCheckbox) {
  const wrapper = mount(<BigRadioButton on={false} isCheckbox={isCheckbox} className="foo" />);
  const image = isCheckbox ? 'checkbox' : 'radio';

  t.ok(wrapper.find('.foo').exists(), 'passes on the className');

  t.strictEqual(
    wrapper.find('img').prop('src'),
    `./assets/images/icon-${image}-off.svg`,
    'renders the off button when on is false',
  );
  wrapper.setProps({
    on: true,
  });
  t.strictEqual(
    wrapper.find('img').prop('src'),
    `./assets/images/icon-${image}-on.svg`,
    'renders the on button when on is true',
  );
  t.end();
}

test('BigRadioButton - as a radio button', (t) => {
  check(t, false);
});

test('BigRadioButton - as a checkbox', (t) => {
  check(t, true);
});
