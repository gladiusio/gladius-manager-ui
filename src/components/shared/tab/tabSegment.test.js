import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TabSegment from './tabSegment';

test('TabSegment - render', (t) => {
  const wrapper = shallow(<TabSegment />);

  t.equal(wrapper.name(), 'div', 'renders div');
  t.end();
});
