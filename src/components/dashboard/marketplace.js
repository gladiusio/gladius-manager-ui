import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import PoolTable from '../poolTable';
import bemify from '../../util/bemify';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { toggleSelectedPool, nextSignupStep, prevSignupStep } from '../../state/actions';
import { createApplications } from '../../state/account';

const bem = bemify('marketplace');

export class BaseMarketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasClickedApply: false,
    };
    this.applyClick = this.applyClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.hasAppliedToPool && this.state.hasClickedApply) {
      this.props.history.push('/dashboard/home');
    }
  }

  applyClick(poolIds) {
    this.setState({hasClickedApply: true});
    this.props.applyToPools(this.props.poolIds);
  }

  render() {
    const props = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <h1 className={classnames(onboardingSecondaryHead, 'mt-5 mb-5')}>
          Marketplace
        </h1>
        <PoolTable
          onRowClick={(poolId) => { props.selectPool(poolId); }}
          allowSelection={false}
        />
      </div>
    );
  }
}

BaseMarketplace.defaultProps = {
  poolIds: [],
};

BaseMarketplace.propTypes = {
  poolIds: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps(state) {
  return {
    poolIds: state.signup.poolIds,
  };
}


function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMarketplace);
