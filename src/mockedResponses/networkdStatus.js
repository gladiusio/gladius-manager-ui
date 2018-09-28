export default {
  "message": "Got service status",
  "success": true,
  "error": "",
  "response": {
    "networkd": {
      "running": true,
      "pid": 45907,
      "environment_vars": [
        "GLADIUSBASE=/home/user/.config/gladius"
      ],
      "executable_location": "/usr/local/bin/gladius-networkd"
    }
  },
  "endpoint": "/service/stats/networkd"
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/service/stats/networkd';
}
