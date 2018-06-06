import test from 'tape';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import TooltipContent from './tooltipContent';

test('TooltipContent', (t) => {
  const onSubmit = sinon.stub();
  const onCancel = sinon.stub();

  const el = (
    <TooltipContent onSubmit={onSubmit} onCancel={onCancel}>
      <div className="ongle-blongle" />
    </TooltipContent>
  );

  const wrapper = mount(el);

  t.ok(wrapper.find('.ongle-blongle').exists(), 'renders children');
  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__content--no-padding').exists(),
    false,
    'shows padding by default',
  );
  t.ok(wrapper.find('.gladius-tooltip-content__footer').exists(), 'renders footer by default');

  const submit = wrapper.find('.gladius-tooltip-content__submit-button');
  submit.simulate('click');
  t.strictEqual(submit.prop('disabled'), false, 'enables the submit button by default');
  t.strictEqual(onSubmit.callCount, 1, 'clicking submit calls the onSubmit callback');
  wrapper.find('.gladius-tooltip-content__cancel-button').simulate('click');
  t.strictEqual(onCancel.callCount, 1, 'clicking cancel calls the onCancel callback');

  wrapper.setProps({
    disableSubmit: true,
    submitText: 'honk',
    cancelText: 'beep',
  });

  t.ok(
    wrapper.find('.gladius-tooltip-content__submit-button').prop('disabled'),
    'disables the submit when disableSubmit is true',
  );
  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').text(),
    'honk',
    'submitText sets the submit button\'s text',
  );
  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__cancel-button').text(),
    'beep',
    'cancelText sets the cancel button\'s text',
  );

  wrapper.setProps({
    submitText: '',
    cancelText: '',
  });

  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__submit-button').exists(),
    false,
    'empty submitText hides the submit button',
  );
  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__cancel-button').exists(),
    false,
    'empty cancelText hides the cancel button',
  );

  wrapper.setProps({
    noFooter: true,
    noPadding: true,
  });

  t.strictEqual(
    wrapper.find('.gladius-tooltip-content__footer').exists(),
    false,
    'hides the footer when noFooter is true',
  );
  t.ok(
    wrapper.find('.gladius-tooltip-content__content--no-padding').exists(),
    'removes padding when noPadding is true',
  );


  t.end();
});
