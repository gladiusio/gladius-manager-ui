export default {
  success: true,
  error: false,
  response: {
    address: "myaddresshere",
  },
}

export function match(path) {
  if (!path) {
    return false;
  }

  return path === '/keystore/account/create';
}
