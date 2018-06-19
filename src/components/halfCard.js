import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from './card';
import bemify from '../util/bemify';

const bem = bemify('half-card');

export default class HalfCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, highlight, title } = this.props;
    return (
      <div className={classnames(bem(), className)}>
        <Card noPadding>
          <div className={classnames(bem('highlight'), highlight)} />
          <div className="container">
            <div className="row align-items-center">
              <div className={bem('container')}>
                <div className={classnames(bem('title'), 'pb-2')}>
                  {title}
                </div>
                {this.props.children}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

HalfCard.defaultProps = {
  highlight: 'none',
  title: null,
  className: '',
};

HalfCard.propTypes = {
  className: PropTypes.string,
  highlight: PropTypes.oneOf(['active', 'inactive', 'paused', 'none']),
  title: PropTypes.node,
};
