import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Input from './input';
import Modal from './modal';
import AuthenticationForm from './authenticationForm';
import ExternalSubmitButton from './externalSubmitButton';
import noop from '../util/noop';
import bemify from '../util/bemify';
import { authorizationActions, authorizationSelectors } from '../state/ducks/authorization';
import { toastActions } from '../state/ducks/toasts';

const { addToast } = toastActions;
const { authorizeUser } = authorizationActions;
const { getIsUnauthorized } = authorizationSelectors;
const bem = bemify('type-to-confirm-modal');

class AuthenticationModal extends Component {
  onSubmit = ({passphraseValue}) => {
    this.setState({loading: true});
    return this.props.authorizeUser(passphraseValue).then(() => {
      this.props.addToast({
        success: true,
        text: 'You have successfully unlocked your wallet!'
      });
      this.setState({loading: false});
    }, () => {
      this.setState({loading: false});
      throw new SubmissionError({
        passphraseValue: 'Unlock failed. Are you sure the passphrase is correct?'
      });
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const {
      isUnauthorized
    } = this.props;
    if (!isUnauthorized) {
      return null;
    }

    return (
      <Modal onClose={() => {}}>
        <div className={bem('wrapper')}>
          <section className={classnames(bem('content'), 'p-4')}>
            <h1 className="mb-2">Your wallet is currently locked</h1>
            <p className="mb-4 text-muted">
              Input your passphrase to open your wallet before continuing.
            </p>
            <AuthenticationForm onSubmit={this.onSubmit}>
            </AuthenticationForm>
          </section>
          <section className={classnames(bem('actions'), 'p-4')}>
            <div className={classnames(bem('primary-buttons'), 'row justify-content-end')}>
              <ExternalSubmitButton
                formIds={['authentication']}
                className="btn btn-primary btn-chunky btn-lg"
              >
                Continue
              </ExternalSubmitButton>
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

AuthenticationModal.propTypes = {
  isUnauthorized: PropTypes.bool,
};

AuthenticationModal.defaultProps = {
  isUnauthorized: false,
};

function mapStateToProps(state) {
  return {
    isUnauthorized: getIsUnauthorized(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authorizeUser: (passphraseValue) => {
      return dispatch(authorizeUser(passphraseValue));
    },
    addToast: (toast) => {
      return dispatch(addToast(toast));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationModal);
