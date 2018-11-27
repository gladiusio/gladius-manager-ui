export default {
  "message": "Got all versions",
  "success":true,
  "error": "",
  "response": {
    "gladius-edged": 0,
    "gladius-guardian": 0,
    "gladius-network-gateway": 0
  },
  "endpoint": "/service/version/all"
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/service/version/all';
}
