import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import bemify from '../util/bemify';

import FakeDropdown from './fakeDropdown';
import Tooltip from './shared/tooltip';
import times from '../constants/time';
import noop from '../util/noop';

export default class TimeDropdown extends Component {
  handleItemClick(close, value) {
    close();
    this.props.onChange(value);
  }

  renderTimesTooltip(close) {
    const onClick = this.handleItemClick.bind(this, close);
    const currentTime = this.props.value;

    return (
      <div className="time-tooltip-content">
        {
          times.map((time) => {
            return (
              <div
                className={classnames({ highlighted: currentTime === time.value }, 'time-tooltip-item')}
                onClick={() => onClick(time.value)}>
                {time.display}
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { props } = this;
    const currentSelected = times.find(time => time.value === props.value);

    return (
      <Tooltip
        className={classnames(props.className)}
        tooltip={this.renderTimesTooltip.bind(this)}
        disabled={props.disabled}
      >
        <FakeDropdown
          value={currentSelected.display}
          className={classnames({ disabled: props.disabled })}
        />
      </Tooltip>
    );
  }
}

TimeDropdown.defaultProps = {
  className: '',
  disabled: false,
  onChange: noop,
};

TimeDropdown.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired,
};
