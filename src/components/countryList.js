import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Filterable from './filterable';
import bemify from '../util/bemify';
import BigRadioButton from './bigRadioButton';
import { COUNTRIES, COUNTRY_CODES } from '../util/countries';

const bem = bemify('country-list');

function matcher(query, i, [countryCode, countryName]) {
  const lower = query.toLowerCase();
  const matchesCode = query.length === 2 && countryCode.toLowerCase() === lower;
  return countryName.toLowerCase().indexOf(lower) > -1 || matchesCode;
}

export default function CountryList(props) {
  const selected = new Set(props.selected);

  function renderer([countryCode, countryName]) {
    const isSelected = selected.has(countryCode);

    return (
      <li
        className={
          classnames(
            bem('country'),
            bem('country', countryCode.toLowerCase()),
            { [bem('country', 'selected')]: isSelected },
          )}
        onClick={() => props.onSelect(countryCode)}
      >
        <BigRadioButton
          on={isSelected}
          className={bem('checkbox')}
          isCheckbox
        />
        {countryName}
      </li>
    );
  }

  return (
    <ul className={bem()}>
      <Filterable
        renderer={renderer}
        matcher={matcher}
        data={COUNTRIES}
        query={props.filter}
      />
    </ul>
  );
}

CountryList.propTypes = {
  filter: PropTypes.string.isRequired,
  selected: PropTypes.arrayOf(PropTypes.oneOf(COUNTRY_CODES)).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onSelect: PropTypes.func.isRequired,
};
