import Contract from './contract';
import marketAbi from './abi/market';

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

export default class Market extends Contract {
  constructor(...args) {
    super(args[0]);

    this.abi = marketAbi;
    this.address = process.env.MARKET_CONTRACT_ADDRESS;
  }

  /**
   * Returns all pools in the marketplace
   *
   * @returns {array} array of pool addresses
   */
  getAllPools = async () => {
    try {
      const deployed = await this.getContract();

      return new Promise((resolve, reject) => {
        deployed.getAllPools.call((error, result) => {
          if (error) reject(error);

          resolve(result.length ? result : ['0x08e8f54262de52fe7dfd0bc0c9ea87689d70e985']);
        });
      });
    } catch (err) {
      return {
        message: 'Failed to retrieve contract.',
        error: err,
      };
    }
  };
}
