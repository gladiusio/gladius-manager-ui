import { Component } from 'react';
import PropTypes from 'prop-types';

import bemify from '../util/bemify';
const bem = bemify('logs');

export default class Logs extends Component {
  renderLogLines() {
    return this.props.logs.map((logLine, i) => {
      return (
        <div key={logLine + i}>{logLine}</div>
      );
    });
  }

  render() {
    return (
      <div className={bem('logs')}>
        {this.renderLogLines()}
      </div>
    );
  }
}

Logs.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.string)
};
