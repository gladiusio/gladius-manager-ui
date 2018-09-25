import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import RatingTooltip from '../ratingTooltip';
import TooltipContent from '../shared/tooltip/tooltipContent';

test('RatingTooltip', (t) => {
  const onApply = sinon.stub();
  const wrapper = mount(<RatingTooltip onApply={onApply} />);

  t.strictEqual(
    wrapper.find('.rating-tooltip__option--selected').exists(),
    false,
    'selects no ratings by default',
  );
  t.ok(wrapper.find(TooltipContent).prop('disableSubmit'), 'disables submit by default');

  wrapper.find('.rating-tooltip__option').at(1).simulate('click');
  t.strictEqual(
    wrapper.find(TooltipContent).prop('disableSubmit'),
    false,
    'enables submit when an option is chosen',
  );
  wrapper.find('.rating-tooltip__option').at(2).simulate('click');
  t.strictEqual(
    wrapper.find('.rating-tooltip__option--selected').length,
    1,
    'selects a maximum of one rating',
  );

  wrapper.find('.gladius-tooltip-content__submit-button').simulate('click');
  t.ok(onApply.calledWith(4), 'calls onApply with minRating when apply is clicked');

  t.end();
});
