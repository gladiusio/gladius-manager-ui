export default {
  "message": "Got service status",
  "success": true,
  "error": "",
  "response": {
    "controld": {
      "running": true,
      "pid": 23742,
      "environment_vars": [
        "GLADIUSBASE=/home/user/.config/gladius"
      ],
      "executable_location": "/usr/local/bin/gladius-controld"
    }
  },
  "endpoint": "/service/stats/controld"
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/service/stats/controld';
}
