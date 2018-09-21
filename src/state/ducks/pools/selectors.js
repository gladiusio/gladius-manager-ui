import sortBy from 'lodash.sortby';

function filterPools(pools, filters, sortInfo) {
  if (!pools || pools.length === 0) {
    return [];
  }
  const {
    locationFilter,
    ratingFilter,
    nodeCountFilter,
    earningsFilter,
  } = filters;
  const { sortDirection, sortColumn } = sortInfo;
  let filteredPools = pools.filter((pool) => {
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

  filteredPools = sortBy(filteredPools, [sortColumn]);
  if (sortDirection === 'desc') {
    filteredPools.reverse();
  }

  return filteredPools;

}

export function getFilteredPools(state) {
  const {
    locationFilter,
    ratingFilter,
    nodeCountFilter,
    earningsFilter,
    availablePools,
  } = state.pools;

  return filterPools(
    availablePools,
    { locationFilter, ratingFilter, nodeCountFilter, earningsFilter },
    {
      sortDirection: state.pools.sortDirection,
      sortColumn: state.pools.sortColumn,
    }
  );
}

export function getPoolCount(state) {
  return state.pools.availablePools.length;
}

export function getPoolSortDirection(state) {
  return state.pools.sortDirection;
}

export function getPoolSortColumn(state) {
  return state.pools.sortColumn;
}

export function getPoolLocationFilter(state) {
  return state.pools.locationFilter;
}

export function getPoolRatingFilter(state) {
  return state.pools.ratingFilter;
}

export function getPoolNodeCountFilter(state) {
  return state.pools.nodeCountFilter;
}

export function getPoolEarningsFilter(state) {
  return state.pools.earningsFilter;
}
