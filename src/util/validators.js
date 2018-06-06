export function isEmailAddress(value) {
  return value && value.indexOf('@') > -1 && value.indexOf('@') < (value.length - 1);
}
