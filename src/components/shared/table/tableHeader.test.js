import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TableHeader from './tableHeader';

test('TableHeader - render', (t) => {
  const wrapper = shallow(<TableHeader />);

  t.equal(wrapper.name(), 'thead', 'renders thead');
  t.end();
});
