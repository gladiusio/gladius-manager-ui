import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import classnames from 'classnames';
import bemify from '../util/bemify';

const bem = bemify('input');

const allowedInputProps = [
  'autoFocus',
  'defaultValue',
  'disabled',
  'id',
  'name',
  'onBlur',
  'onChange',
  'onKeyDown',
  'onKeyUp',
  'placeholder',
  'type',
  'value',
];

function renderErrorMessage(errorMessage, inTooltip) {
  if (!errorMessage) {
    return null;
  }

  if (inTooltip) {
    return (
      <div className={classnames(bem('tooltip'), 'text-nowrap')}>
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="invalid-feedback">{errorMessage}</div>
  );
}

export default function Input(props) {
  const wrapperClass = classnames(bem(), 'form-group', props.wrapperClassName);
  const InputComponent = props.type === 'textarea' ? 'textarea' : 'input';
  const inputClass = classnames(props.className, 'form-control', {
    'is-invalid': props.errorMessage,
  });

  return (
    <div className={wrapperClass}>
      <InputComponent key="input" className={inputClass} {...pick(props, allowedInputProps)} />
      {renderErrorMessage(props.errorMessage, props.showsErrorTooltip)}
    </div>
  );
}

Input.defaultProps = {
  errorMessage: '',
  showsErrorTooltip: false,
  wrapperClassName: '',
  className: '',
  type: 'text',
};

Input.propTypes = {
  errorMessage: PropTypes.string,
  showsErrorTooltip: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};
