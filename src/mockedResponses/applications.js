export default {
  message: null,
  success: true,
  error: false,
  response: [
    {
      "pool": {
        "CreatedAt":"1987-07-25T16:00:00Z",
        "DeletedAt":null,
        "ID":1,
        "UpdatedAt": "1987-07-25T16:00:00Z",
        "address": "0x3BbEbCe4e6E3E6DFBe70415102e457e4EE2903e1",
        "bio": "Test Application Server",
        "location": "NY East 1",
        "name": "Gladius Pool - Application Server",
        "nodeCount": 1,
        "public": true,
        "rating": 5,
        "wallet": "0x1f136d7b6308870ed334378f381c9f56d04c3aba"
      },
      "profile": {
        "pending": true,
        "approved": false,
        "bio": "I desperately need money.",
        "email": "test@example.com",
        "estimatedSpeed": 100,
        "location": "",
        "name": "John Doe",
        "wallet": "0xa634d7ecc09fa5684d6bfeec351d594c23e96229"
      }
    },
    {
      "pool": {
        "CreatedAt":"1987-07-25T16:00:00Z",
        "DeletedAt":null,
        "ID":2,
        "UpdatedAt": "1987-07-25T16:00:00Z",
        "address": "0x3BbEbCe4e6E3E6DFBe70415102e457e4EE2903e2",
        "bio": "Test Application Server",
        "location": "NY East 1",
        "name": "Gladius Pool - B",
        "nodeCount": 1,
        "public": true,
        "rating": 2,
        "wallet": "0x1f136d7b6308870ed334378f381c9f56d04c3aba"
      },
      "profile": {
        "pending": false,
        "approved": true,
        "bio": "I have extra compute power.",
        "email": "test1@example.com",
        "estimatedSpeed": 16,
        "location": "",
        "name": "Jane Doe",
        "wallet": "0xa634d7ecc09fa5684d6bfeec351d594c23e96229"
      }
    },
    {
      "pool": {
        "CreatedAt": "1987-07-25T16:00:00Z",
        "DeletedAt": null,
        "ID": 3,
        "UpdatedAt": "1987-07-25T16:00:00Z",
        "address": "0x3BbEbCe4e6E3E6DFBe70415102e457e4EE2903e3",
        "bio": "Test Application Server",
        "location": "NY West 1",
        "name": "Gladius Pool - A",
        "nodeCount": 1,
        "public": true,
        "rating": 3,
        "wallet": "0x1f136d7b6308870ed334378f381c9f56d04c3abz"
      },
      "profile": {
        "pending": false,
        "approved": false,
        "bio": "",
        "email": "",
        "estimatedSpeed": 0,
        "location": "",
        "name": "",
        "wallet": "0xa634d7ecc09fa5684d6bfeec351d594c23e96229"
      }
    }
  ],
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/node/applications';
}
