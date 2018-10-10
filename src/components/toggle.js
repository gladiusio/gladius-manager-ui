import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import bemify from '../util/bemify';
import noop from '../util/noop';

const bem = bemify('toggle');

export default class Toggle extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick(!this.props.on);
  }

  render() {
    const { className, on } = this.props;

    return (
      <div className={classnames(bem(), className)} onClick={this.handleOnClick}>
        <div className={classnames(bem('toggle-container'), { [bem('container-on')]: on })}>
          <div className={classnames(bem('toggle-switch'), { [bem('switch-on')]: on })}>
          </div>
        </div>
      </div>
    );
  }
}

Toggle.defaultProps = {
  className: '',
  onClick: noop,
  on: true
};

Toggle.propTypes = {
  className: PropTypes.string,
  on: PropTypes.bool,
  onClick: PropTypes.func
};
