import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { accountActions } from '../state/ducks/account';
import { serviceInfoActions } from '../state/ducks/serviceInfo';
import { authorizationActions, authorizationSelectors } from '../state/ducks/authorization';
import MastheadContentSplit from './mastheadContentSplit';
import historyPropType from '../propTypes/history';
import Masthead from './masthead';
import EmailForm from './emailForm';
import bemify from '../util/bemify';
import { startPoll } from '../util/polling';

const { setEmailAddressAndName } = accountActions;
const { getAccount } = authorizationActions;
const { getHasAccount, getIsUnauthorized } = authorizationSelectors;
const { fetchServiceStatuses } = serviceInfoActions;
const bem = bemify('home');

export class BaseHome extends Component {
  componentDidMount() {
    this.props.getAccount();
    startPoll('serviceStatus', this.props.getServiceStatuses, 10000);
  }

  componentDidUpdate() {
    this.props.getAccount();
  }

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
    if (this.props.onboardingDone) {
      return <Redirect to="/dashboard/home" />;
    }

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

function mapStateToProps(state) {
  return {
    onboardingDone: getHasAccount(state),
    isUnauthorized: getIsUnauthorized(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEmailAddressAndName: (email, name) => {
      return dispatch(setEmailAddressAndName(email, name));
    },
    getAccount: () => {
      return dispatch(getAccount());
    },
    getServiceStatuses: () => {
      return dispatch(fetchServiceStatuses());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseHome);
