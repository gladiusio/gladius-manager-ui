import sortBy from 'lodash.sortby';

export function filterPools(
  pools,
  filters,
  sortInfo
) {
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
  console.log(locationFilter);
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
