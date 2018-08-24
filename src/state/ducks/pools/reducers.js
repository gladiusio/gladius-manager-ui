import sortBy from 'lodash.sortby';

import {
  SORT_POOLS,
  GET_ALL_POOLS_ERROR,
  GET_ALL_POOLS_SUCCESS,
  SET_LOCATION_FILTER,
  SET_RATING_FILTER,
  SET_NODE_COUNT_FILTER,
  SET_EARNINGS_FILTER
} from './types';

function reduceSortPools(state, payload) {
  const { sortDirection, sortColumn } = state;
  const { col } = payload;

  if (col !== sortColumn) {
    return {
      ...state,
      sortColumn: col,
      sortDirection: 'asc',
    };
  }

  return {
    ...state,
    sortDirection: sortDirection === 'asc' ? 'desc' : 'asc',
  };
}

function reduceGetAllPoolsSuccess(state, payload) {
  return {
    ...state,
    availablePools: payload.pools,
  };
}

function reduceGetAllPoolsError(state) {
  return {
    ...state,
    availablePools: [],
  };
}

function reduceSetLocationFilter(state, payload) {
  return {
    ...state,
    locationFilter: payload.locationFilter,
  };
}

function reduceSetRatingFilter(state, payload) {
  return {
    ...state,
    ratingFilter: payload.ratingFilter,
  };
}

function reduceSetNodeCountFilter(state, payload) {
  return {
    ...state,
    nodeCountFilter: payload.nodeCountFilter,
  };
}

function reduceSetEarningsFilter(state, payload) {
  return {
    ...state,
    earningsFilter: payload.earningsFilter,
  };
}

function getInitialState() {
  return {
    availablePools: [],
    sortDirection: 'desc',
    sortColumn: null,
    locationFilter: [],
    ratingFilter: 0,
    nodeCountFilter: [0, 100],
    earningsFilter: [0, 100]
  };
}

export default function poolReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SORT_POOLS:
      return reduceSortPools(state, action.payload);
    case GET_ALL_POOLS_SUCCESS:
      return reduceGetAllPoolsSuccess(state, action.payload);
    case GET_ALL_POOLS_ERROR:
      return reduceGetAllPoolsError(state, action.payload);
    case SET_LOCATION_FILTER:
      return reduceSetLocationFilter(state, action.payload);
    case SET_RATING_FILTER:
      return reduceSetRatingFilter(state, action.payload);
    case SET_NODE_COUNT_FILTER:
      return reduceSetNodeCountFilter(state, action.payload);
    case SET_EARNINGS_FILTER:
      return reduceSetEarningsFilter(state, action.payload);
    default:
      return state;
  }
}
