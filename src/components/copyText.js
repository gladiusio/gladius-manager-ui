import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import bemify from '../util/bemify';

const bem = bemify('copy-text');

export default class CopyText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.textElement = React.createRef();

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy() {
    this.setState({
      copied: true
    });
    setTimeout(() => {
      this.setState({copied: false});
    }, 3000);

    this.textElement.current.select();
    document.execCommand('copy');
  }

  renderButton() {
    let text = 'Copy';

    if (this.state.copied) {
      text = 'Copied!';
    }

    return (
      <button
        className={classnames(bem('copy-button'), 'btn btn-secondary ml-2')}
        onClick={this.onCopy}
      >
        {text}
      </button>
    );
  }

  render() {
    const { className, value, textareaClass } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <textarea
          key="text"
          ref={this.textElement}
          className={classnames(bem('text'), textareaClass)}
          value={value}
          readOnly
        />
        {this.renderButton()}
      </div>
    );
  }
}

CopyText.defaultProps = {
  className: '',
  textareaClass: '',
  value: '',
};

CopyText.propTypes = {
  className: PropTypes.string,
  textareaClass: PropTypes.string,
  value: PropTypes.string,
};
