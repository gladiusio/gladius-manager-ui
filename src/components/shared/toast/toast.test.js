import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Toast from './toast';

test('Toast - render', (t) => {
  const wrapper = shallow(<Toast />);

  t.equal(wrapper.name(), 'div', 'renders div');
  t.end();
});

test('Toast - render success', (t) => {
  const wrapper = shallow(<Toast success />);

  t.equal(wrapper.find('.success').length, 1, 'renders with success class');
  t.equal(wrapper.find('img').length, 1, 'renders with success image');
  t.end();
});
