import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Component } from 'react';

import Modal from './modal';
import noop from '../util/noop';
import bemify from '../util/bemify';

const bem = bemify('view-application-modal');

export default class ViewApplicationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingAddress: false,
    };

    this.handleShowAddress = this.handleShowAddress.bind(this);
  }
  renderField(title, value, suffix = '') {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return (
      <div className="mb-3">
        <div>{title}</div>
        <div className="text-muted">{value}{suffix}</div>
      </div>
    );
  }

  handleShowAddress(e) {
    e.preventDefault();
    this.setState({showingAddress: true});
  }

  renderHeader(application) {
    let address = null;
    if (this.state.showingAddress) {
      address = (
        <span className="text-muted">{application.pool.address}</span>
      );
    } else {
      address = (
        <a href="#" className={bem('show-address')} onClick={this.handleShowAddress}>
          View pool address
        </a>
      );
    }

    return (
      <section>
        <div className={classnames(bem('header-container'), 'p-4')}>
          <h1 className="mb-2">Application Information</h1>
          <p className="mb-3 text-muted">
            This is the info that you submitted to the pool:
          </p>
          <p className="mb-0 text-muted">
            {application.pool.name}
          </p>
          {address}
        </div>
      </section>
    );
  }

  render() {
    const {
      application,
      onClose
    } = this.props;
    if (!application || !application.profile) {
      return null;
    }
    const { email, name, bio, estimatedSpeed } = application.profile;

    return (
      <Modal onClose={onClose}>
        <div className={bem('wrapper')}>
          {this.renderHeader(application)}
          <section className={classnames(bem('content'), 'p-4')}>
            {this.renderField('Name', name)}
            {this.renderField('Email', email)}
            {this.renderField('Upload Speed', estimatedSpeed, 'mbps')}
            {this.renderField('Biography', bio)}
          </section>
          <section className={classnames(bem('actions'), 'p-4')}>
            <div className={classnames(bem('primary-buttons'), 'row justify-content-end')}>
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

ViewApplicationModal.propTypes = {
  application: PropTypes.bool,
  onClose: PropTypes.func,
};

ViewApplicationModal.defaultProps = {
  application: null,
  onClose: noop,
};
