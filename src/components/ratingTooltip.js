import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Tooltip from './shared/tooltip/tooltip';
import bemify from '../util/bemify';
import StarRating from './starRating';

const bem = bemify('rating-tooltip');

export default class RatingTooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minRating: props.minRating,
      isPristine: true,
    };

    this.apply = this.apply.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      minRating: props.minRating,
    });
  }

  onClick(minRating) {
    this.setState({
      minRating,
      isPristine: false,
    });
  }

  apply() {
    this.setState({
      isPristine: true,
    });

    this.props.onApply(this.state.minRating);
  }

  clear() {
    this.setState({
      isPristine: true,
    });

    this.props.onClear();
  }


  renderOptions() {
    const options = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 2; i <= 4; i++) {
      const el = (
        <div
          className={classnames(bem('option'), { [bem('option', 'selected')]: this.state.minRating === i })}
          onClick={() => this.onClick(i)}
          key={i}
        >
          {i}
          <StarRating rating={i} />
        </div>
      );

      options.push(el);
    }

    return options;
  }

  render() {
    return (
      <Tooltip.TooltipContent
        onSubmit={this.apply}
        disableSubmit={this.state.isPristine}
        onCancel={this.clear}
        submitText="Apply"
        cancelText="Clear"
      >
        <p className="mb-2">At least</p>
        <div className={bem()}>
          {this.renderOptions()}
        </div>
      </Tooltip.TooltipContent>
    );
  }
}

RatingTooltip.defaultProps = {
  minRating: 0,
};

RatingTooltip.propTypes = {
  onApply: PropTypes.func.isRequired,
  minRating: PropTypes.number,
};
