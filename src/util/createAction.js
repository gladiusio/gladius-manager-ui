export function createAction(type, payload, error = false) {
  if (error) {
    return {
      type,
      payload,
      error,
    };
  }

  return {
    type,
    payload,
  };
}

export function createApiAction(type, payload, apiService) {
  return {
    type,
    payload,
    meta: {
      apiService
    },
  };
}

export function nameAction(namespace, name) {
  return `gladius-node-manager/${namespace}/${name}`;
}
