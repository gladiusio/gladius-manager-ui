export default {
  "message": null,
  "success": true,
  "error": null,
  "response": {
    "address": "0x3BbEbCe4e6E3E6DFBe70415102e457e4123s02i0s8"
  },
  "endpoint": "/api/keystore/account"
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/keystore/account';
}
