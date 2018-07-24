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
  constructor(props) {
    super(props);
  }

  renderTitle() {
    // <TooltipWrapper
    //   className={classnames(bem('tooltip'), 'ml-2')}
    //   content="hello there how are you doing">
    //   <img src="./assets/images/icon-info.svg" alt="Info" />
    // </TooltipWrapper>

    return (
      <div className={classnames(bem('title'))}>
        Node status
      </div>
    );
  }

  renderStatusContent() {
    const {status} = this.props;
    let text, icon;

    if (!status) {
      text = 'N/A';
      icon = 'inactive';
    } else {
      let statusDisplay = STATUS_DISPLAY[status];
      text = statusDisplay.text;
      icon = statusDisplay.icon;
    }

    return (
      <div>
        <div className={bem('icon')}>
          <img src={`./assets/images/icon-status-${icon}-big.svg`} alt="" />
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
  status: null,
  className: null,
};

BaseStatusCard.propTypes = {
  className: PropTypes.string,
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
