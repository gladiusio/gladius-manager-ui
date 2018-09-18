import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import StarRating from '../starRating';

test('StarRating', (t) => {
  const wrapper = mount(<StarRating rating={1} />);
  t.strictEqual(wrapper.find('.star-rating__star--on').length, 1, 'renders 1 star when rating is 1');
  t.strictEqual(wrapper.find('.star-rating__star').length, 5, 'renders all stars');

  wrapper.setProps({
    rating: 3.6,
  });
  t.strictEqual(wrapper.find('.star-rating__star--on').length, 4, 'rounds star ratings up when decimal > .5');

  wrapper.setProps({
    rating: 4.5,
  });
  t.strictEqual(wrapper.find('.star-rating__star--on').length, 5, 'rounds star ratings up when decimal = .5');

  wrapper.setProps({
    rating: 2.2,
  });
  t.strictEqual(wrapper.find('.star-rating__star--on').length, 2, 'rounds star ratings down when decimal < .5');

  t.end();
});
