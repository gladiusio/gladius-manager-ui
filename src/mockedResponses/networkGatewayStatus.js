export default {
  "message": "Got service status",
  "success": true,
  "error": "",
  "response": {
    "network-gateway": {
      "running": true,
      "pid": 23742,
      "environment_vars": [
        "GLADIUSBASE=/home/user/.config/gladius"
      ],
      "executable_location": "/usr/local/bin/gladius-network-gateway"
    }
  },
  "endpoint": "/service/stats/network-gateway"
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/service/stats/network-gateway';
}
