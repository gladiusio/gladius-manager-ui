import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import getElementType from '../getElementType';

test('getElementType - with `as` property set', (t) => {
  const element = shallow(<div as="a" />);
  const props = {
    as: 'a',
  };
  const result = getElementType(element, props);

  t.equals(result, 'a', 'returns a');
  t.end();
});

test('getElementType - with `href` property set', (t) => {
  const element = shallow(<div as="a" />);
  const props = {
    href: 'www.link.com',
  };
  const result = getElementType(element, props);

  t.equals(result, 'a', 'returns a');
  t.end();
});

test('getElementType - fallback to div', (t) => {
  const element = shallow(<input />);
  const props = {};
  const result = getElementType(element, props);

  t.equals(result, 'div', 'returns div');
  t.end();
});
