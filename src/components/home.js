import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { accountActions } from '../state/ducks/account';
import { serviceInfoActions, serviceInfoSelectors } from '../state/ducks/serviceInfo';
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
const { getNonRunningServices } = serviceInfoSelectors;
const { fetchServiceStatuses, startServices } = serviceInfoActions;
const bem = bemify('home');

export class BaseHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startedServices: false,
    };
  }

  componentDidMount() {
    this.props.getServiceStatuses().then((statuses) => {
      const servicesToStart = getNonRunningServices(statuses);
      this.props.startServices(servicesToStart).then(() => {
        startPoll('serviceStatus', this.props.getServiceStatuses, 10000);
        this.setState({startedServices: true});
        this.props.getAccount();
      });
    });
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

  renderLoading() {
    return (
      <div className={classnames(bem('loading-container'))}>
        <h1
          className={classnames(
            bem('logo'),
            bem('logo', 'light')
          )}
        >
        </h1>
        <h4>Starting services...</h4>
      </div>
    );
  }

  render() {
    if (this.props.onboardingDone) {
      return <Redirect to="/dashboard/home" />;
    }

    if (!this.state.startedServices) {
      return this.renderLoading();
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
    },
    startServices: (services) => {
      return dispatch(startServices(services));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseHome);
