export default {
  "message": "Got service status",
  "success": true,
  "error": "",
  "response": {
    "edged": {
      "running": true,
      "pid": 45907,
      "environment_vars": [
        "GLADIUSBASE=/home/user/.gladius"
      ],
      "executable_location": "/usr/local/bin/gladius-networkd"
    }
  },
  "endpoint": "/service/stats/edged"
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/service/stats/network-gateway';
}
