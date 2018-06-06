/**
 * Returns the type of element based on the props of the Component
 *
 * @param {function} Component A function or ReactClass
 * @param {object} props A ReactElement props object
 * @returns {string|function} A ReactElement type
 *
 * @example
 * getElementType(<ListItem>, {as: 'a'})
 */
export default function getElementType(Component, props) {
  const { defaultProps = {} } = Component;

  if (props.as && props.as !== defaultProps.as) {
    return props.as;
  }

  if (props.href) {
    return 'a';
  }

  // Default to div as fallback
  return defaultProps.as || 'div';
}
