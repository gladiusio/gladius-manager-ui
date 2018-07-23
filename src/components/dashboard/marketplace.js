import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import ComingSoon from '../comingSoon';
import PoolTable from '../poolTable';
import bemify from '../../util/bemify';
import ManualPoolApply from '../manualPoolApply';
import { onboardingSecondaryHead, onboardingSubhead } from '../../sharedClassNames';
import { createApplications } from '../../state/account';

const bem = bemify('marketplace');

export class BaseMarketplace extends Component {
  constructor(props) {
    super(props);

    this.applyClick = this.applyClick.bind(this);
  }

  applyClick(poolIds) {
    return this.props.applyToPools(poolIds);
  }

  render() {
    const props = this.props;

    return (
      <div className={classnames(bem(), 'col-10')}>
        <h5 className={classnames(bem('pool-input-title'), 'mt-5')}>
          Paste in a pool address to apply to a pool.
        </h5>
        <ManualPoolApply
          className="row justify-content-start mb-5 pl-3 pr-3"
          inputClass={classnames(bem('pool-input'))}
          disabled={props.loading}
          onSubmit={(poolId) => this.applyClick([poolId.poolAddress]) }
          placeholder="Pool address. Example: 0xDAcd582..."
          buttonText="Apply to Pool"
        />
        <ComingSoon className="p-3">
          <PoolTable
            onRowClick={(poolId) => { props.selectPool(poolId); }}
            allowSelection={false}
          />
        </ComingSoon>
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
    applyToPools: (poolIds) => dispatch(createApplications(poolIds)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMarketplace);
