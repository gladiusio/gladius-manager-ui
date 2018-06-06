import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '../util/noop';
import bemify from '../util/bemify';

const bem = bemify('big-radio-button');

export default function BigRadioButton(props) {
  return (
    <img
      src={`./assets/images/icon-${props.isCheckbox ? 'checkbox' : 'radio'}-${props.on ? 'on' : 'off'}.svg`}
      alt=""
      className={classnames(props.className, bem(), 'cursor-pointer')}
      onClick={props.onClick}
    />
  );
}

BigRadioButton.defaultProps = {
  isCheckbox: false,
  className: '',
  onClick: noop,
};

BigRadioButton.propTypes = {
  on: PropTypes.bool.isRequired,
  isCheckbox: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
