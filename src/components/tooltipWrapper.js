import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import bemify from '../util/bemify';

const bem = bemify('tooltip-wrapper');

export default function TooltipWrapper(props) {
  return (
    <div className={classnames(bem(), props.className)}>
      <div
        className={classnames(bem('tooltip'), { hide: props.disabled })}
        style={props.tooltipStyle}
      >
        {props.content}
      </div>
      {props.children}
    </div>
  );
}

TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  tooltipStyle: PropTypes.object,
};

TooltipWrapper.defaultProps = {
  className: '',
  tooltipStyle: {},
  disabled: false,
};
