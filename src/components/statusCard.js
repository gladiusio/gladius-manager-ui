import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import HalfCard from './halfCard';
import TooltipWrapper from './tooltipWrapper';
import bemify from '../util/bemify';

const bem = bemify('status-card');
const ACTIVE = 'active';
const PAUSED = 'paused';
const INACTIVE = 'inactive';

const STATUS_DISPLAY = {
  [ACTIVE]: {
    text: 'Connected',
    icon: 'active',
  },
  [PAUSED]: {
    text: 'Paused',
    icon: 'paused',
  },
  [INACTIVE]: {
    text: 'Inactive',
    icon: 'inactive',
  }
};

class BaseStatusCard extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);
  }

  renderTitle() {
    return (
      <div className={classnames(bem('title'))}>
        Node status
        <TooltipWrapper
          className={classnames(bem('tooltip'), 'ml-2')}
          content="hello there how are you doing">
          <img src="/assets/images/icon-info.svg" alt="Info" />
        </TooltipWrapper>
      </div>
    );
  }

  renderStatusContent() {
    const {status} = this.props;
    const {text, icon} = STATUS_DISPLAY[status];

    return (
      <div>
        <div className={bem('icon')}>
          <img src={`/assets/images/icon-status-${icon}-big.svg`} alt="" />
        </div>
        <div className={bem('content')}>
          <h1>{text}</h1>
        </div>
      </div>
    );
  }

  render() {
    const { className, status } = this.props;

    return (
      <HalfCard
        className={className}
        title={this.renderTitle()}
        highlight={status}>
        {this.renderStatusContent()}
      </HalfCard>
    );
  }
}

BaseStatusCard.defaultProps = {
  status: 'active',
};

BaseStatusCard.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect()(BaseStatusCard);
