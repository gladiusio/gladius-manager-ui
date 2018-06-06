import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TableBody from './tableBody';

test('TableBody - render', (t) => {
  const wrapper = shallow(<TableBody />);

  t.equal(wrapper.name(), 'tbody', 'renders tbody');
  t.end();
});
