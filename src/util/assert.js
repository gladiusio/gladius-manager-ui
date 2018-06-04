// can't use class syntax here since we need to preserve instanceof characteristics.
export function AssertionError(message) {
  this.message = message;
  this.name = 'AssertionError';
  this.stack = (new Error(message)).stack;
}

AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.constructor = AssertionError;

export default function assert(condition, message) {
  const type = typeof condition;

  if (type !== 'boolean') {
    throw new AssertionError(`condition must be a boolean, got: ${type}`);
  }

  if (!condition) {
    throw new AssertionError(message || 'Assertion error.');
  }
}
