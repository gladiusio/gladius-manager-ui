import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default class LockedRoute extends PureComponent {
  render() {
    const {
      component: Component,
      isAllowed,
      redirectTo,
      ...routeProps
    } = this.props;
    return (
      <Route
        exact
        {...routeProps}
        render={(renderProps) => {
          if (isAllowed(routeProps)) {
            return (
              <Component {...renderProps} />
            );
          }

          return (
            <Redirect to={redirectTo} />
          );
        }}
      />
    );
  }
}

LockedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isAllowed: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
