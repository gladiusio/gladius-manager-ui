import w3Manager from '../w3';

/**
 * Usage:
 *
 *   const Market = new Market({ w3: '' });
 *   const contract = Market.getContract();
 *
 * @param {string} name - Name of the class in map
 * @param {Object} opts - Options for the lass
 * @param {Object} opts.w3 - w3 instance
 */
export default class Contract {
  constructor({ w3 = null, address = null }) {
    this.w3 = w3 || w3Manager.withW3(web3 => web3);
    this.address = address;

    this.contract = null;
  }

  async getContract() {
    if (!this.contract) {
      this.contract = await this.w3.eth.contract(this.abi).at(this.address);
    }

    return this.contract;
  }
}
