import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { shell } from 'electron';

import Input from './input';
import Modal from './modal';
import ExternalSubmitButton from './externalSubmitButton';
import noop from '../util/noop';
import bemify from '../util/bemify';
import { startPoll } from '../util/polling';
import { serviceInfoActions, serviceInfoSelectors } from '../state/ducks/serviceInfo';
import { toastActions } from '../state/ducks/toasts';

const { addToast } = toastActions;
const { checkIfOutdated, dismissOutdated } = serviceInfoActions;
const { getIsOutdatedVersion } = serviceInfoSelectors;
const bem = bemify('type-to-confirm-modal');

class OutdatedVersionModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    startPoll('OutdatedVersionModal', this.props.checkIfOutdated, 30000);
  }

  render() {
    const {
      isOutdated
    } = this.props;
    if (!isOutdated) {
      return null;
    }

    return (
      <Modal onClose={() => {}}>
        <div className={bem('wrapper')}>
          <section className={classnames(bem('content'), 'p-4')}>
            <h1 className="mb-2">There's a new version of Gladius available</h1>
            <p className="mb-2 text-muted">
              It is strongly recommended that you update to the most recent version.
            </p>
          </section>
          <section className={classnames(bem('actions'), 'p-4')}>
            <div className={classnames(bem('primary-buttons'), 'row justify-content-end')}>
              <button
                onClick={() => this.props.dismissOutdated()}
                className="btn btn-text btn-md ml-3"
              >
                Continue without downloading
              </button>
              <button
                onClick={() => shell.openExternal('https://gladius.io/download')}
                className="btn btn-primary btn-chunky btn-lg"
              >
                Go to Download
              </button>
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}
OutdatedVersionModal.propTypes = {
  isOutdated: PropTypes.bool,
  checkIfOutdated: PropTypes.func,
  dismissOutdated: PropTypes.func,
};

OutdatedVersionModal.defaultProps = {
  isOutdated: false,
};

function mapStateToProps(state) {
  return {
    isOutdated: getIsOutdatedVersion(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkIfOutdated: () => {
      return dispatch(checkIfOutdated());
    },
    dismissOutdated: () => {
      return dispatch(dismissOutdated());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OutdatedVersionModal);
