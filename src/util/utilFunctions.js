export function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function echo(val) {
  return val;
}
