import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import StarRating from './starRating';
import BigRadioButton from './bigRadioButton';
import Card from './card';
import Table from './shared/table';
import Tooltip from './shared/tooltip/tooltip';
import FakeDropdown from './fakeDropdown';
import CountryTooltip from './countryTooltip';
import RatingTooltip from './ratingTooltip';
import SliderTooltip from './sliderTooltip';
import SpeedGradient from './speedGradient';
import poolPropType from '../propTypes/pool';
import {
  handleSort,
  getAllPools,
  setLocationFilter,
  setRatingFilter,
  setNodeCountFilter,
  setEarningsFilter,
} from '../state/ducks/pools';
import bemify from '../util/bemify';

const bem = bemify('pool-table');

function filterPools(
  pools,
  locationFilter,
  ratingFilter,
  nodeCountFilter,
  earningsFilter
) {
  if (!pools || pools.length === 0) {
    return [];
  }

  return pools.filter((pool) => {
    let locationMatch = locationFilter.indexOf(pool.location) > -1;
    if (locationFilter.length === 0) {
      locationMatch = true;
    }

    const ratingMatch = Number(pool.rating) >= ratingFilter;
    const nodeCountMatch = Number(pool.nodeCount) >= nodeCountFilter[0] &&
      Number(pool.nodeCount) <= nodeCountFilter[1];
    const earningsMatch = Number(pool.earnings || 0) >= earningsFilter[0] &&
      Number(pool.earnings || 0) <= earningsFilter[1];

    return locationMatch && ratingMatch && nodeCountMatch && earningsMatch;
  });
}

export class BasePoolTable extends Component {
  constructor(props) {
    super(props);

    const methods = [
      'getOnApply',
      'renderPricingTooltip',
      'renderNodesTooltip',
      'renderRatingTooltip',
      'renderLocationTooltip',
      'renderRow',
    ];

    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentWillMount() {
    this.props.getAllPools();
  }

  getOnApply(hide, action) {
    return (value) => {
      action(value);
      hide();
    };
  }

  renderPricingTooltip(hide) {
    return (
      <SliderTooltip
        values={this.props.earningsFilter}
        min={0}
        max={100}
        onApply={this.getOnApply(hide, this.props.setEarningsFilter)}
        descriptionRenderer={([lo, hi]) => (
          <div>
            <p className="mr-2">
              {lo} GLA/GB - {hi} GLA/GB
            </p>
            <p className="mr-2 text-muted">
              The average price is 50 GLA/GB
            </p>
          </div>
        )}
      />
    );
  }

  renderNodesTooltip(hide) {
    return (
      <SliderTooltip
        values={this.props.nodeCountFilter}
        onApply={this.getOnApply(hide, this.props.setNodeCountFilter)}
        descriptionRenderer={([lo, hi]) => (
          <p className="mr-2">
            {lo} - {hi} nodes
          </p>
        )}
      />
    );
  }

  renderRatingTooltip(hide) {
    return (
      <RatingTooltip
        onApply={this.getOnApply(hide, this.props.setRatingFilter)}
        minRating={this.props.ratingFilter}
      />
    );
  }

  renderLocationTooltip(hide) {
    return (
      <CountryTooltip
        onApply={this.getOnApply(hide, this.props.setLocationFilter)}
        onClear={hide}
        selected={this.props.locationFilter}
      />
    );
  }

  renderRow(p) {
    const { allowSelection, poolIds } = this.props;
    let isSelected = poolIds.indexOf(p.address) > -1;
    let checkbox = null;
    if (allowSelection) {
      checkbox = (
        <Table.Cell className="py-4 text-center">
          <BigRadioButton
            isCheckbox
            on={isSelected}
          />
        </Table.Cell>
      );
    }

    return (
      <Table.Row
        key={p.address}
        className={
          classnames(bem('pool-row'), {
            [bem('pool-row', 'selected')]: isSelected,
          })
        }
        onClick={() => this.props.onRowClick(p.address)}
      >
        {checkbox}
        <Table.Cell>{p.name}</Table.Cell>
        <Table.Cell>{p.location}</Table.Cell>
        <Table.Cell><StarRating rating={p.rating} /></Table.Cell>
        <Table.Cell>{p.nodeCount}</Table.Cell>
        <Table.Cell>
          <img src="./assets/images/icon-logo-small.svg" alt="" className="mr-2" />
          {p.earnings} GLA<span className="text-muted">/GB</span>
        </Table.Cell>
      </Table.Row>
    );
  }

  renderTableHeader() {
    const {
      allowSelection,
      sortDirection,
      sortColumn,
    } = this.props;

    let firstColumn = null;
    if (allowSelection) {
      firstColumn = (
        <Table.HeaderCell className="blank" sorted="" />
      );
    }

    return (
      <Table.Header>
        <Table.Row>
          {firstColumn}
          <Table.HeaderCell
            className="name"
            sorted={sortColumn === 'name' ? sortDirection : ''}
            onClick={() => this.props.handleSort('name')}
          >
            Pool Name
          </Table.HeaderCell>
          <Table.HeaderCell
            className="location"
            sorted={sortColumn === 'location' ? sortDirection : ''}
            onClick={() => this.props.handleSort('location')}
          >
            Location
          </Table.HeaderCell>
          <Table.HeaderCell
            className="rating"
            sorted={sortColumn === 'rating' ? sortDirection : ''}
            onClick={() => this.props.handleSort('rating')}
          >
            Rating
          </Table.HeaderCell>
          <Table.HeaderCell
            className="nodeCount"
            sorted={sortColumn === 'nodeCount' ? sortDirection : ''}
            onClick={() => this.props.handleSort('nodeCount')}
          >
            Node Count
          </Table.HeaderCell>
          <Table.HeaderCell
            className="price"
            sorted={sortColumn === 'price' ? sortDirection : ''}
            onClick={() => this.props.handleSort('price')}
          >
            Monthy Earnings
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  render() {
    const {
      className,
      sortDirection,
      sortColumn,
      pools,
      poolIds,
      totalPools,
    } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <div className="row mb-3 align-items-center">
          <div className="col-3">
            <span className="font-italic">
              <span className="text-muted">Showing</span>&nbsp;
              { pools.length === totalPools ? 'all pools' : pools.length + ' pools' }
            </span>
          </div>
          <div className="col-9 text-right">
            <span className="text-muted mr-3">Filter by:</span>
            <Tooltip tooltip={this.renderLocationTooltip}>
              <FakeDropdown value="Location" className="mr-2" />
            </Tooltip>
            <Tooltip tooltip={this.renderRatingTooltip}>
              <FakeDropdown value="Rating" className="mr-2" />
            </Tooltip>
            <Tooltip tooltip={this.renderNodesTooltip}>
              <FakeDropdown value="Nodes" className="mr-2" />
            </Tooltip>
            <Tooltip tooltip={this.renderPricingTooltip}>
              <FakeDropdown value="Monthly Earnings" />
            </Tooltip>
          </div>
        </div>
        <Card noPadding>
          <Table className="table">
            {this.renderTableHeader()}
            <Table.Body>
              {pools.map(this.renderRow)}
            </Table.Body>
          </Table>
        </Card>
      </div>
    );
  }
}

BasePoolTable.defaultProps = {
  allowSelection: true,
  className: '',
  poolIds: [],
  sortColumn: 'name',
  sortDirection: 'asc',
};

/* eslint react/no-unused-prop-types: "off" */
BasePoolTable.propTypes = {
  allowSelection: PropTypes.bool.isRequired,
  className: PropTypes.string,
  handleSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  getAllPools: PropTypes.func.isRequired,
  poolIds: PropTypes.arrayOf(PropTypes.string),
  pools: PropTypes.arrayOf(poolPropType).isRequired,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const {
    locationFilter,
    ratingFilter,
    nodeCountFilter,
    earningsFilter,
    availablePools,
  } = state.pools;
  const pools = filterPools(
    availablePools, locationFilter, ratingFilter, nodeCountFilter, earningsFilter
  );
  return {
    poolIds: state.signup.poolIds,
    pools,
    totalPools: availablePools.length,
    sortDirection: state.pools.sortDirection,
    sortColumn: state.pools.sortColumn,
    locationFilter,
    nodeCountFilter,
    ratingFilter,
    earningsFilter,
    allowSelection: ownProps.allowSelection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSort: col => dispatch(handleSort(col)),
    getAllPools: () => dispatch(getAllPools()),
    setLocationFilter: (locations) => dispatch(setLocationFilter(locations)),
    setRatingFilter: (rating) => dispatch(setRatingFilter(rating)),
    setNodeCountFilter: (nodeCount) => dispatch(setNodeCountFilter(nodeCount)),
    setEarningsFilter: (earnings) => dispatch(setEarningsFilter(earnings)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePoolTable);
