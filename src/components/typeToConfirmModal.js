import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';

import Input from './input';
import Modal from './modal';
import noop from '../util/noop';
import bemify from '../util/bemify';

const bem = bemify('type-to-confirm-modal');

export default class TypeToConfirmModal extends Component {
  onPrimaryButtonClick = () => {
    this.props.action();
  };

  onInputChange = (event) => {
    this.setState({typedValue: event.target.value});
  };

  constructor(props) {
    super(props);

    this.state = {
      typedValue: null,
    };
  }

  renderPrimaryButtons() {
    const {
      actionName,
      actionType,
      confirmString,
      disabled
    } = this.props;
    const { typedValue } = this.state;

    return (
      <Fragment>
        <button
          type="button"
          className={classnames(bem('confirm'), 'btn btn-primary btn-chunky btn-lg')}
          onClick={this.onPrimaryButtonClick}
          disabled={disabled || confirmString !== typedValue}
        >
          Yes, {actionName}
        </button>
      </Fragment>
    );
  }

  render() {
    const {
      content,
      title,
      confirmString,
      onClose
    } = this.props;

    return (
      <Modal onClose={onClose}>
        <div className={bem('wrapper')}>
          <section className={classnames(bem('content'), 'p-4')}>
            <h1 className="mb-2">{title}</h1>
            <p>{content}</p>
            <div className="mt-5">
              <label>Please type in "{confirmString}" to confirm.</label>
              <Input className="m-0" onChange={this.onInputChange} />
            </div>
          </section>
          <section className={classnames(bem('actions'), 'p-4')}>
            <div className={bem('primary-buttons')}>
              {this.renderPrimaryButtons()}
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

TypeToConfirmModal.propTypes = {
  action: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  confirmString: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

TypeToConfirmModal.defaultProps = {
  confirmString: '',
};
