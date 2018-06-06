import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TableRow from './tableRow';

test('TableRow - render', (t) => {
  const wrapper = shallow(<TableRow />);

  t.equal(wrapper.name(), 'tr', 'renders tr');
  t.end();
});
