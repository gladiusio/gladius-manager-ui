import { getJSON, delayed } from '../../../backend';
import mockedPoolsResponse from '../../../mockedResponses/pools';

const mockData = process.env.MOCK_DATA === "true";

export function fetchPools() {
  if (mockData) {
    return delayed(() => {
      return mockedPoolsResponse;
    }, 2000);
  }

  return new Promise((resolve, reject) => {
    resolve(mockedPoolsResponse);
  });
  // TODO: make the actual call to pools.
  // return getJSON(`${process.env.CONTROL_API}/market/pools`);
}
