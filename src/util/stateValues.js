import { instanceOf, oneOfType } from 'prop-types';

const castArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};

export class ErrorState {
  /**
   * Create a new error state
   * @param {Error} error The error that caused the state
   * @param {*} previousValue A reference to the previous value
   */
  constructor(error, previousValue) {
    this.error = error;
    this.previousValue = previousValue;
  }
}

export class LoadingState {
  /**
   * Create a new loading state
   * @param {*} previousValue A reference to the previous value
   */
  constructor(previousValue) {
    this.previousValue = previousValue;
  }
}

export class NoValue {}

export const errorValuePropType = instanceOf(ErrorState);

export const loadingValuePropType = instanceOf(LoadingState);

export const noValuePropType = instanceOf(NoValue);

/**
 * Create a prop types validator for stateful values
 * @param {Validator<*>[]|Validator<*>} dataTypes a collection of propType validators
 * @returns {Requireable} A PropType.oneOfType function that accepts a value state
 */
export function stateValueTypePropType(dataTypes = []) {
  const types = castArray(dataTypes);
  return oneOfType([
    errorValuePropType,
    loadingValuePropType,
    noValuePropType,
    ...types,
  ]);
}

/**
 * Is the value set, either to a value or error
 * @param {*} value Anything
 * @returns {boolean} True if is loaded, else false
 */
export function notLoaded(value) {
  return value instanceof NoValue;
}

/**
 * Is the value set, either to a value or error
 * @param {*} value Anything
 * @returns {boolean} True if is loaded, else false
 */
export function isLoading(value) {
  return value instanceof LoadingState;
}

/**
 * Value is in an error state
 * @param {*} value Anything
 * @returns {boolean} True if is error, else false
 */
export function isError(value) {
  return value instanceof ErrorState;
}

/**
 * Any of the values are in an error state
 * @param {...*} values An array of any mixed values
 * @returns {boolean} True if is error, else false
 */
export function isAnyError(...values) {
  return values.some(isError);
}

/**
 * Returns values that are in an error state
 * @param {...*} values An array of any mixed values
 * @returns {Array<ErrorState>} An array of ErrorState objects
 */
export function someError(...values) {
  return values.filter(isError);
}

/**
 * Value isn't available and is a pending state
 * @param {*} value Anything
 * @returns {boolean} True if is in a pending, else false
 */
export function isPending(value) {
  return value instanceof NoValue || value instanceof LoadingState;
}

/**
 * On value of values isn't available and is a pending state
 * @param {...*} values An array of any mixed values
 * @returns {boolean} True if is pending, else false
 */
export function isAnyPending(...values) {
  return values.some(isPending);
}

/**
 * Value is ready to be used as the expected value
 * @param {*} value Anything
 * @returns {boolean} True if has a value, else false
 */
export function isReady(value) {
  return !(
    value instanceof NoValue || value instanceof ErrorState || value instanceof LoadingState
  );
}

/**
 * Values are all ready to be used as the expected value
 * @param {...*} values An array of any mixed values
 * @returns {boolean} True if has a value, else false
 */
export function isAllReady(...values) {
  return values.every(isReady);
}

/**
 * If the given value is ready, apply the provided mapping
 * function to it, else apply the identity function
 * @template T,R
 * @param {T} value the state value
 * @param {function(T): R} f the mapping function
 * @return {T|R} the result of the {@code f}
 */
export function mapIfReady(value, f) {
  if (isReady(value)) {
    return f(value);
  }

  return value;
}
