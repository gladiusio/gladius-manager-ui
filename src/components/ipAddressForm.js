import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classnames from 'classnames';

import bemify from '../util/bemify';
import Input from './input';
import { accountSelectors } from '../state/ducks/account';

const { getIp } = accountSelectors;
const bem = bemify('ip');

const IPAddressField = ({ input, type }) => (
  <div className="input form-group">
    <input
      className="form-control"
      {...input}
      type={type}
    />
  </div>
);

class BaseIPAddressForm extends Component {
  render() {
    const {
      handleSubmit,
      onSubmit,
      className
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classnames(bem('ip'), className)}>
        <div className="form-group">
          <label>IP Address</label>
          <Field
            name="ip"
            type="text"
            component={IPAddressField}
          />
          <div className="mb-5">
            <span className="text-muted sub-text">
              This IP address was automatically detected. If you notice something wrong, enter your IP address.
            </span>
          </div>
        </div>
      </form>
    );
  }
}

BaseIPAddressForm = reduxForm({
  form: 'ipAddress',
})(BaseIPAddressForm);

function mapStateToProps(state) {
  return {
    initialValues: { ip: getIp(state) },
  };
}

BaseIPAddressForm = connect(
  mapStateToProps
)(BaseIPAddressForm);

export default BaseIPAddressForm;
