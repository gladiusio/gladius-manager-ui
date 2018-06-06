export function stateField(component, fieldName) {
  return {
    onChange: e => component.setState({ [fieldName]: e.target.value }),
    value: component.state[fieldName],
  };
}

export function reduxFormField(componentOrProps, fieldName) {
  const props = componentOrProps.props ? componentOrProps.props : componentOrProps;

  return {
    onChange: e => props.updateField(fieldName, e.target.value),
    value: props[fieldName].value,
  };
}
