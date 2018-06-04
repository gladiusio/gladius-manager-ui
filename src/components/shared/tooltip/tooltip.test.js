import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import Tooltip from './tooltip';

test('Tooltip', (t) => {
  // need this since DOM elements can't have arbitrary props
  function Wrap(props) {
    return props.children;
  }

  const content = (
    <div className="biggle-smiggle">
      <div className="smoggle" />
    </div>
  );

  const el = (
    <div className="bonk">
      <Tooltip tooltip={() => content}>
        <Wrap>
          <div className="clickable" />
        </Wrap>
      </Tooltip>
    </div>
  );

  const wrapper = mount(el);

  t.strictEqual(wrapper.find('.biggle-smiggle').exists(), false, 'does not render the tooltip by default');
  wrapper.find('.clickable').simulate('click');
  t.ok(wrapper.find('.biggle-smiggle').exists(), 'renders the tooltip when the tooltip\'s child is clicked');
  t.strictEqual(wrapper.find(Wrap).prop('isTooltipOpen'), true, 'passes the isTooltipOpen prop');
  wrapper.find('.biggle-smiggle').simulate('click');
  wrapper.find('.smoggle').simulate('click');
  t.strictEqual(
    wrapper.find('.biggle-smiggle').exists(),
    true,
    'does not hide the tooltip when items in the tooltip are clicked',
  );
  const node = wrapper.getDOMNode();
  document.body.appendChild(node);
  wrapper.getDOMNode().click();
  wrapper.update();
  t.strictEqual(wrapper.find('.biggle-smiggle').exists(), false, 'hides the tooltip when anything outside the tooltip is clicked');
  document.body.removeChild(node);

  t.end();
});
