import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import classnames from 'classnames';

const allowedSelectProps = [
  'value',
  'onChange',
  'defaultValue',
];

function renderErrorMessage(errorMessage) {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className="invalid-feedback">{errorMessage}</div>
  );
}

export default function Select(props) {
  const inputClass = classnames(props.className, 'form-control', {
    'is-invalid': props.errorMessage,
  });

  return (
    <div className="form-group">
      <select key="input" className={inputClass} {...pick(props, allowedSelectProps)}>
        {props.children}
      </select>
      {renderErrorMessage(props.errorMessage)}
    </div>
  );
}

Select.defaultProps = {
  errorMessage: '',
  className: '',
};

Select.propTypes = {
  errorMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
