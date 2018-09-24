import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import Masthead from '../masthead';

test('Masthead', (t) => {
  const wrapper = mount(<Masthead><div className="hello" /></Masthead>);
  t.ok(wrapper.find('.hello').exists(), 'renders children');
  t.notOk(wrapper.find('.masthead--dark').exists(), 'does not add the dark style when dark is false');

  wrapper.setProps({
    dark: true,
  });

  t.ok(wrapper.find('.masthead--dark').exists(), 'adds the dark style when dark is true');
  t.end();
});
