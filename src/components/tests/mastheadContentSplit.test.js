import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import MastheadContentSplit from '../mastheadContentSplit';

test('MastheadContentSplit', (t) => {
  const el = (
    <MastheadContentSplit masthead={<div className="masthead-content" />}>
      <div className="children-content" />
    </MastheadContentSplit>
  );

  const wrapper = mount(el);
  t.ok(wrapper.find('.masthead-content').exists(), 'renders masthead content');
  t.ok(wrapper.find('.children-content').exists(), 'renders children');
  t.end();
});
