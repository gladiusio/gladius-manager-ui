import sortBy from 'lodash.sortby';
import { nameAction, createAction } from '../util/createAction';
import Market from '../util/contracts/market';
import Pool from '../util/contracts/pool';
import { getJSON } from '../backend';

export function makePool(id, name, location, rating, nodeCount, maxBandwidth, speed, price) {
  return {
    id,
    name,
    location,
    rating,
    nodeCount,
    maxBandwidth,
    speed,
    price,
  };
}
const marketContract = new Market({ w3: window.web3 });

const namespace = 'pools';

const SORT_POOLS = nameAction(namespace, 'SORT_POOLS');
const GET_ALL_POOLS_ERROR = nameAction(namespace, 'GET_ALL_POOLS_ERROR');
const GET_ALL_POOLS_SUCCESS = nameAction(namespace, 'GET_ALL_POOLS_SUCCESS');

function getInitialState() {
  return {
    availablePools: [],
    sortDirection: 'desc',
    sortColumn: 'name',
  };
}

function fetchPools() {
  return getJSON(`${process.env.CONTROL_API}/market/pools`);
}

export function getAllPoolsError(error) {
  return async dispatch => dispatch(createAction(GET_ALL_POOLS_ERROR, {
    error,
  }));
}

export function getAllPoolsSuccess(pools) {
  return async dispatch => dispatch(createAction(GET_ALL_POOLS_SUCCESS, {
    pools,
  }));
}

export function handleSort(col) {
  return createAction(SORT_POOLS, {
    col,
  });
}

export function getAllPools() {
  return async (dispatch) => {
    try {
      const pools = await fetchPools();
      if (pools.error) return dispatch(getAllPoolsError(pools.error));

      return dispatch(getAllPoolsSuccess([]));
    } catch (err) {
      return dispatch(getAllPoolsError(err));
    }
  }
}

function reduceSortPools(state, payload) {
  const { availablePools, sortColumn, sortDirection } = state;
  const { col } = payload;

  if (col !== sortColumn) {
    return {
      ...state,
      sortColumn: col,
      availablePools: sortBy(availablePools, [col]),
      sortDirection: 'asc',
    };
  }

  return {
    ...state,
    availablePools: availablePools.reverse(),
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

export default function poolReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case SORT_POOLS:
      return reduceSortPools(state, action.payload);
    case GET_ALL_POOLS_SUCCESS:
      return reduceGetAllPoolsSuccess(state, action.payload);
    case GET_ALL_POOLS_ERROR:
      return reduceGetAllPoolsError(state, action.payload);
    default:
      return state;
  }
}
