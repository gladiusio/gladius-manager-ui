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
import { choosePool } from '../state/onboarding';
import {
  handleSort,
  getAllPools,
} from '../state/pools';
import bemify from '../util/bemify';

const bem = bemify('pool-table');

export class BasePoolTable extends Component {
  static renderPricingTooltip(hide) {
    return (
      <SliderTooltip
        values={[0, 100]}
        min={0}
        max={100}
        onApply={hide}
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

  static renderNodesTooltip(hide) {
    return (
      <SliderTooltip
        values={[0, 100]}
        onApply={hide}
        descriptionRenderer={([lo, hi]) => (
          <p className="mr-2">
            {lo} - {hi} nodes
          </p>
        )}
      />
    );
  }

  static renderRatingTooltip(hide) {
    return (
      <RatingTooltip onApply={hide} />
    );
  }

  static renderLocationTooltip(hide) {
    return (
      <CountryTooltip
        onApply={hide}
        onClear={hide}
        selected={[]}
      />
    );
  }

  componentWillMount() {
    this.props.getAllPools();
  }

  render() {
    const {
      className,
      sortDirection,
      sortColumn,
      pools,
      poolId,
      selectedPoolId,
    } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <div className="row mb-3 align-items-center">
          <div className="col-3">
            <span className="font-italic"><span className="text-muted">Showing</span> all pools</span>
          </div>
          <div className="col-9 text-right">
            <span className="text-muted mr-3">Filter by:</span>
            <Tooltip tooltip={BasePoolTable.renderLocationTooltip}>
              <FakeDropdown value="Location" className="mr-2" />
            </Tooltip>
            <Tooltip tooltip={BasePoolTable.renderRatingTooltip}>
              <FakeDropdown value="Rating" className="mr-2" />
            </Tooltip>
            <Tooltip tooltip={BasePoolTable.renderNodesTooltip}>
              <FakeDropdown value="Nodes" className="mr-2" />
            </Tooltip>
            <Tooltip tooltip={BasePoolTable.renderPricingTooltip}>
              <FakeDropdown value="Monthly Earnings" />
            </Tooltip>
          </div>
        </div>
        <Card noPadding className="mb-4">
          <Table className="table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="blank" sorted="" />
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
                  Price
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {pools.map(p => (
                <Table.Row
                  key={p.address}
                  className={
                    classnames(bem('pool-row'), {
                      [bem('pool-row', 'selected')]: (p.address === poolId),
                    })
                  }
                  onClick={() => this.props.onRowClick(p.address)}
                >
                  <Table.Cell className="py-4 text-center">
                    <BigRadioButton on={(selectedPoolId || poolId) === p.address} />
                  </Table.Cell>
                  <Table.Cell>{p.name}</Table.Cell>
                  <Table.Cell>{p.location}</Table.Cell>
                  <Table.Cell><StarRating rating={p.rating} /></Table.Cell>
                  <Table.Cell>{p.nodeCount}</Table.Cell>
                  <Table.Cell>
                    <img src="/assets/images/icon-logo-small.svg" alt="" className="mr-2" />
                    {p.price.value} GLA<span className="text-muted">/GB</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      </div>
    );
  }
}

BasePoolTable.defaultProps = {
  className: '',
  poolId: null,
  selectedPoolId: null,
  sortColumn: 'name',
  sortDirection: 'asc',
};

/* eslint react/no-unused-prop-types: "off" */
BasePoolTable.propTypes = {
  choosePool: PropTypes.func.isRequired,
  className: PropTypes.string,
  handleSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  getAllPools: PropTypes.func.isRequired,
  poolId: PropTypes.string,
  pools: PropTypes.arrayOf(poolPropType).isRequired,
  selectedPoolId: PropTypes.string,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    poolId: state.signup.poolId,
    selectedPoolId: ownProps.selectedPoolId,
    pools: state.pools.availablePools,
    sortDirection: state.pools.sortDirection,
    sortColumn: state.pools.sortColumn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    choosePool: id => dispatch(choosePool(id)),
    handleSort: col => dispatch(handleSort(col)),
    getAllPools: () => dispatch(getAllPools()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePoolTable);
