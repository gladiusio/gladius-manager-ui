import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { setEmailAddressAndName } from '../state/account';
import MastheadContentSplit from './mastheadContentSplit';
import historyPropType from '../propTypes/history';
import Masthead from './masthead';
import EmailForm from './emailForm';
import bemify from '../util/bemify';

const bem = bemify('home');

export class BaseHome extends Component {
  renderEmail() {
    return (
      <Fragment>
        <div className="row justify-content-center">
          <div className="col-8 mt-5 text-center">
            <EmailForm
              onSubmit={({email, name}) => {
                this.props.setEmailAddressAndName(email, name);
                this.props.history.push('/signup');
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <MastheadContentSplit masthead={<Masthead />}>
        <div className={classnames(bem(), 'container-fluid pb-5')}>
          <div className="row justify-content-center">
            <div className="email-container col-6">
              {this.renderEmail()}
            </div>
          </div>
        </div>
      </MastheadContentSplit>
    );
  }
}

BaseHome.propTypes = {
  history: historyPropType.isRequired,
  setEmailAddressAndName: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    setEmailAddressAndName: (email, name) => {
      return dispatch(setEmailAddressAndName(email, name));
    },
  };
}

export default connect(null, mapDispatchToProps)(BaseHome);
