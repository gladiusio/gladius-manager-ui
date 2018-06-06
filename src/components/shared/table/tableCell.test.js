import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TableCell from './tableCell';

test('TableCell - render', (t) => {
  const wrapper = shallow(<TableCell />);

  t.equal(wrapper.name(), 'td', 'renders td');
  t.end();
});
