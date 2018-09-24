import test from 'tape';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import CountryTooltip from '../countryTooltip';
import { searchField } from '../../sharedClassNames';

test('CountryTooltip', (t) => {
  const selected = ['US'];
  const onApply = sinon.stub();
  const onClear = sinon.stub();

  const wrapper = mount(<CountryTooltip selected={selected} onApply={onApply} onClear={onClear} />);

  t.ok(
    wrapper.find('.country-list__country--us.country-list__country--selected').exists(),
    'selects the items in the selected array',
  );

  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').prop('disabled'),
    true,
    'by default disables the submit button',
  );

  wrapper.find(`input.${searchField}`).simulate('change', {
    target: {
      value: 'united states',
    },
  });

  // shows USA and US Minor Outlying Islands
  t.strictEqual(wrapper.find('.country-list__country').length, 2, 'lets users filter the countries');

  wrapper.find('.country-list__country--us .big-radio-button').simulate('click');
  wrapper.find('.country-list__country--um .big-radio-button').simulate('click');

  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').prop('disabled'),
    false,
    'enables the submit button after an edit',
  );

  wrapper.find('.gladius-tooltip-content__submit-button').simulate('click');
  t.ok(onApply.calledWith(['UM']), 'clicking apply calls onApply with the new selection set');

  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').prop('disabled'),
    true,
    'disables the submit button after applying changes',
  );

  wrapper.find('.country-list__country--us .big-radio-button').simulate('click');
  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').prop('disabled'),
    false,
    'enables the submit button after a subsequent edit',
  );

  wrapper.find('.gladius-tooltip-content__cancel-button').simulate('click');
  t.ok(onApply.calledWith([]), 'clicking clear calls onApply with an empty selection set');
  t.strictEqual(onClear.callCount, 1, 'clicking clear calls onClear');
  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').prop('disabled'),
    true,
    'disables the submit button after clearing changes',
  );

  t.end();
});
