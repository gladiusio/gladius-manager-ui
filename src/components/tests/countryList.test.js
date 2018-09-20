import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import CountryList from '../countryList';
import { COUNTRIES } from '../../util/countries';

test('CountryList', (t) => {
  const onSelect = sinon.stub();
  const wrapper = mount(<CountryList filter="" selected={['US']} onSelect={onSelect} />);

  t.strictEqual(wrapper.find('.country-list__country').length, COUNTRIES.length, 'renders all countries in the list');
  t.ok(
    wrapper.find('.country-list__country--us').hasClass('country-list__country--selected'),
    'selects the rows described in the selected prop',
  );

  wrapper.setProps({
    filter: 'united',
  });
  t.strictEqual(wrapper.find('.country-list__country').length, 4, 'setting the filer prop filters the list');

  wrapper.setProps({
    filter: 'uNiTeD',
  });
  t.strictEqual(wrapper.find('.country-list__country').length, 4, 'the filter is case insensitive');

  wrapper.setProps({
    filter: 'UK',
  });
  t.strictEqual(wrapper.find('.country-list__country').length, 1, 'the filter will return countries based on code');

  wrapper.setProps({
    filter: '',
  });
  t.ok(
    wrapper.find('.country-list__country--us').hasClass('country-list__country--selected'),
    'preserves selections through filtering attempts',
  );

  wrapper.find('.country-list__country--gb').simulate('click');
  t.ok(onSelect.calledWith('GB'), 'clicking on a checkbox calls the onSelect callback with the country code');

  t.end();
});
