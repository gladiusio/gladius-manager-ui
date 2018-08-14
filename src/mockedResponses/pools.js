export default {
  "message": null,
  "success": true,
  "error": null,
  "response": {
    pools: [
      {
        "address":"0x7663fEE3390C93f4e09a52F7C09680Af7C6591Es",
        "data": {
          "name": "Gladius Pool A",
          "location": "NYC - United States",
          "rating": "3.5",
          "nodeCount": "20",
          "maxBandwidth": "10",
        }
      },
      {
        "address":"0x7663fEE3390C93f4e09a52F7C09680Af7C6591Eb",
        "data": {
          "name": "Gladius Pool Z",
          "location": "NYC - United States",
          "rating": "2",
          "nodeCount": "20",
          "maxBandwidth": "10",

          // modified
          "status": "accepted",
          "bandwidthUse": "10",
          "earnings": "12",
        }
      },
      {
        "address":"0x7663fEE3390C93f4e09a52F7C09680Af7C6591Ev",
        "data": {
          "name": "Gladius Pool M",
          "location": "NYC - United States",
          "rating": "1",
          "nodeCount": "20",
          "maxBandwidth": "10",

          // modified
          "status": "pending",
          "bandwidthUse": "10",
          "earnings": "12",
        }
      },
      {
        "address": "0xDAcd582c3Ba1A90567Da0fC3f1dBB638D9438e0z",
        "data": {
          "name": "Gladius Pool R",
          "location": "NYC - United States",
          "rating": "3",
          "nodeCount": "20",
          "maxBandwidth": "10",

          "status": "rejected",
          "bandwidthUse": "20",
          "earnings": "23",
        }
      }
    ]
  },
  "endpoint": "/api/market/pools"
}
