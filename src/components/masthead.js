import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import bemify from '../util/bemify';

const bem = bemify('masthead');

function renderChildren(children) {
  if (!children) {
    return null;
  }

  return (
    <div className="col">
      {children}
    </div>
  );
}

export default function Masthead(props = {}) {
  return [
    <header
      className={
        classnames(
          bem(),
          {
            [bem(null, 'dark')]: props.dark,
          },
        )
      }
    >
      <div className="container-fluid">
        <div className="row align-items-center justify-content-start">
          <div className={classnames(props.containerClass, 'col-sm-auto')}>
            <h1
              className={classnames(
                bem('logo'),
                {
                  [bem('logo', 'light')]: !props.dark,
                  [bem('logo', 'dark')]: props.dark,
                },
              )}
            >
              Gladius
            </h1>
          </div>
          {renderChildren(props.children)}
        </div>
      </div>
    </header>,
    <div className={bem('holder')}></div>
  ];
}

Masthead.defaultProps = {
  containerClass: '',
  children: null,
  dark: false,
};

Masthead.propTypes = {
  containerClass: PropTypes.string,
  children: PropTypes.node,
  dark: PropTypes.bool,
};
