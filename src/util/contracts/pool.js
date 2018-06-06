import Contract from './contract';
import poolAbi from './abi/pool';

export default class Pool extends Contract {
  constructor(...args) {
    super(args[0]);

    this.abi = poolAbi;
  }

  /**
   * Returns all pools in the marketplace
   *
   * @returns {void}
   */
  getPublicData = async () => {
    try {
      const deployed = await this.getContract();

      return new Promise((resolve, reject) => {
        deployed.publicData.call((error, response) => {
          if (error) reject(error);

          resolve(response ? JSON.parse(response) : {
            '0x08e8f54262de52fe7dfd0bc0c9ea87689d70e985': [{
              name: '3214-MEX',
              location: 'Mexico',
              rating: '4.5',
              nodeCount: '23',
              maxBandwidth: '12',
              speed: {
                value: '23',
                unit: 'ms',
              },
              price: {
                value: '4',
                unit: '$',
              },
              address: '0x123123123',
            }],
          });
        });
      });
    } catch (err) {
      return {
        message: 'Failed to retrieve pool contract.',
        error: err,
      };
    }
  };
}
