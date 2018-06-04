import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TableHeaderCell from './tableHeaderCell';

test('TableHeaderCell - render', (t) => {
  const wrapper = shallow(<TableHeaderCell />);

  t.equal(wrapper.name(), 'TableCell', 'renders TableCell');
  t.equal(wrapper.props().as, 'th', 'passes correct props to TableCell');
  t.end();
});

test('TableHeaderCell - render sorted classes', (t) => {
  function mountWithProps(props) {
    const wrapper = shallow(<TableHeaderCell {...props} />);

    t.ok(wrapper.find(`.${props.sorted}`), `sets ${props.sorted} class`);
  }

  mountWithProps({ sorted: 'asc' });
  mountWithProps({ sorted: 'desc' });

  t.end();
});
