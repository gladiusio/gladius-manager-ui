import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Rheostat from 'rheostat';
import SliderTooltip from '../sliderTooltip';
import TooltipContent from '../shared/tooltip/tooltipContent';

test('SliderTooltip', (t) => {
  const onApply = sinon.stub();
  const el = (
    <SliderTooltip
      min={10}
      max={30}
      values={[15, 20]}
      onApply={onApply}
      descriptionRenderer={([lo, hi]) => (
        <div className="text">{lo}-{hi}</div>
      )}
    />
  );
  const wrapper = mount(el);

  t.ok(wrapper.find(TooltipContent).prop('disableSubmit'), 'disables submit by default');

  const updated = wrapper.find(Rheostat);
  updated.prop('onValuesUpdated').call(null, {
    values: [16, 19],
  });

  wrapper.update();

  t.strictEqual(
    wrapper.find(TooltipContent).prop('disableSubmit'),
    false,
    'enables submit after change',
  );

  wrapper.find('.gladius-tooltip-content__submit-button').simulate('click');
  t.ok(onApply.calledWith([16, 19]), 'clicking apply calls onApply');
  t.end();
});
