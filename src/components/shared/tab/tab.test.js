import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import Tab from './tab';

test('Tab - render', (t) => {
  const segments = [
    { menuItem: 'Hello', render: () => (<Tab.Segment>Testing</Tab.Segment>) },
  ];
  const wrapper = mount(<Tab segments={segments} />);

  t.equal(wrapper.find(Tab.Segment).length, 1, 'renders 1 Tab.Segment');
  t.ok(wrapper.find('a.tab-menu__item').exists(), 'renders a menu item');
  t.end();
});
