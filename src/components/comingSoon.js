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
    const { className, displayText, textTop } = this.props;

    const textContainerClass = {
      [bem('container-top')]: textTop,
    };

    const textClass = {
      [bem('text-top')]: textTop,
    };

    const coverClass = {
      [bem('cover-top')]: textTop,
    };

    return (
      <div className={classnames(bem(), className)}>
        <div className={classnames(bem('text-container'), textContainerClass)}>
          <h1 className={classnames(bem('text'), textClass)}>
            {displayText}
          </h1>
        </div>
        <div className={classnames(bem('cover'), coverClass)}>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ComingSoon.defaultProps = {
  displayText: 'Coming Soon',
  textTop: false,
};

ComingSoon.propTypes = {
  className: PropTypes.string,
  displayText: PropTypes.string,
  textTop: PropTypes.bool,
};
