import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import HalfCard from './halfCard';
import TooltipWrapper from './tooltipWrapper';
import bemify from '../util/bemify';

const bem = bemify('earnings-card');

class BaseEarningsCard extends Component {
  render() {
    const { className, status } = this.props;

    return (
      <HalfCard
        title="Total estimated earnings"
        highlight="none"
        className={className}>
        <div className="col-12 row align-content-center mb-2">
          <h1 className="m-0">55</h1>
          <div className="gla ml-2">
            GLA
          </div>
        </div>
      </HalfCard>
    );
  }
}

BaseEarningsCard.defaultProps = {
  status: 'active',
};

BaseEarningsCard.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect()(BaseEarningsCard);
