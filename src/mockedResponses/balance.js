export default {
  success: true,
  error: false,
  response: {
    value: 200,
    symbol: 'gla',
  }
}

export function match(path) {
  if (!path) {
    return false;
  }

  if (path[0] === '/') {
    path = path.slice(1);
  }

  const pathFragments = path.split('/');
  return pathFragments[0] === 'account' &&
    pathFragments[2] === 'balance' &&
    pathFragments[1] && pathFragments[3];
}
