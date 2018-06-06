import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import bemify from '../util/bemify';

const bem = bemify('fake-dropdown');

export default function FakeDropdown(props) {
  return (
    <div className={classnames(bem(), props.className, { [bem(null, 'open')]: props.isTooltipOpen })}>
      {props.value || props.children}
    </div>
  );
}

FakeDropdown.defaultProps = {
  children: [],
  className: '',
  isTooltipOpen: false,
  value: '',
};

FakeDropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.string,
  isTooltipOpen: PropTypes.bool,
};
