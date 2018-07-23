import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import bemify from '../util/bemify';

const bem = bemify('coming-soon');

export default class ComingSoon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
  }

  render() {
    const { className, displayText } = this.props;

    return (
      <div className={classnames(bem(), className)}>
        <div className={classnames(bem('text-container'))}>
          <h1 className={classnames(bem('text'))}>
            {displayText}
          </h1>
        </div>
        <div className={classnames(bem('cover'))}>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ComingSoon.defaultProps = {
  displayText: 'Coming Soon',
};

ComingSoon.propTypes = {
  className: PropTypes.string,
  displayText: PropTypes.string,
};
