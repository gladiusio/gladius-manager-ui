import { createAction, createApiAction } from '../../../util/createAction';
import { delayed } from '../../../backend';
import mockedPoolsResponse from '../../../mockedResponses/pools';
import {
  SORT_POOLS,
  GET_ALL_POOLS_ERROR,
  GET_ALL_POOLS_SUCCESS,
  SET_LOCATION_FILTER,
  SET_RATING_FILTER,
  SET_NODE_COUNT_FILTER,
  SET_EARNINGS_FILTER,
  API_GET_POOLS
} from './types';

export async function applyToPools(poolIds) {
  for(var i = 0; i < poolIds.length; i++) {
    let application;
    try {
      application = await dispatch(applyToPool(
        poolIds[i],
        {
          email,
          name,
          bio,
          estimatedSpeed,
        }
      ));
    } catch(e) {
      throw new Error(e);
    }

    if (application && application.error) {
      return application;
    }
  }
}

export function applyToPool(poolId, body) {
  if (poolId && poolId.trim) {
    poolId = poolId && poolId.trim();
  }

  return async (dispatch) => {
    return await dispatch(createApiAction(API_APPLY_TO_POOL, {}, {
      path: `/node/applications/${poolId}/new`,
      method: 'POST',
      body,
    }));
  };
}

export function fetchPools() {
  return (dispatch) => {
    return dispatch(createApiAction(API_GET_POOLS, {}, {
      path: '/market/pools',
    }));
  }
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

export function setLocationFilter(locationFilter) {
  return createAction(SET_LOCATION_FILTER, {
    locationFilter,
  });
}

export function setRatingFilter(ratingFilter) {
  return createAction(SET_RATING_FILTER, {
    ratingFilter,
  });
}

export function setNodeCountFilter(nodeCountFilter) {
  return createAction(SET_NODE_COUNT_FILTER, {
    nodeCountFilter,
  });
}

export function setEarningsFilter(earningsFilter) {
  return createAction(SET_EARNINGS_FILTER, {
    earningsFilter,
  });
}

export function getAllPools() {
  return async (dispatch) => {
    try {
      const pools = await dispatch(fetchPools());
      if (pools.error) return dispatch(getAllPoolsError(pools.error));
      const allPools = pools.response.pools.map((pool) => {
        let data = pool.data;
        return {
          address: pool.address,
          ...data,
        };
      });

      return dispatch(getAllPoolsSuccess(allPools));
    } catch (err) {
      return dispatch(getAllPoolsError(err));
    }
  }
}
