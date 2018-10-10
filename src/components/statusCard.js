import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import HalfCard from './halfCard';
import TooltipWrapper from './tooltipWrapper';
import { serviceInfoSelectors } from '../state/ducks/serviceInfo';
import bemify from '../util/bemify';

const { getAllServicesRunning } = serviceInfoSelectors;
const bem = bemify('status-card');
const ACTIVE = 'active';
const PAUSED = 'paused';
const INACTIVE = 'inactive';

const STATUS_DISPLAY = {
  [ACTIVE]: {
    text: 'All services running',
    icon: 'active',
  },
  [PAUSED]: {
    text: 'Something is wrong',
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
        Status
      </div>
    );
  }

  renderStatusContent() {
    const { status, showLink } = this.props;
    let text, icon;

    if (!status) {
      text = 'N/A';
      icon = 'inactive';
    } else {
      let statusDisplay = STATUS_DISPLAY[status];
      text = statusDisplay.text;
      icon = statusDisplay.icon;
    }

    let link = null;
    if (status === 'paused' && showLink) {
      link = (
        <Link
          to="/dashboard/status"
          className={classnames(bem('status-link'), 'text-muted')}
        >
          Go to status page
          <img src="./assets/images/icon-arrow-small.svg" className="ml-2" />
        </Link>
      );
    }

    return (
      <div>
        <div className={bem('icon')}>
          <img src={`./assets/images/icon-status-${icon}-big.svg`} alt="" />
        </div>
        <div className={bem('content')}>
          <h1>{text}</h1>
        </div>
        {link}
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
    status: getAllServicesRunning(state) ? 'active' : 'paused',
  };
}

export default connect(mapStateToProps)(BaseStatusCard);
