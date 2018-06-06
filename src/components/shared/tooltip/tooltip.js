import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import bemify from '../../../util/bemify';
import TooltipContent from './tooltipContent';

const bem = bemify('gladius-tooltip');

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    this.pageClickListener = (e) => {
      let { target } = e;

      while (target !== document.body) {
        if (target === this.el) {
          return;
        }

        target = target.parentNode;
      }

      this.hide();
    };

    document.body.addEventListener('click', this.pageClickListener);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.pageClickListener);
  }

  show() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      isVisible: true,
    });
  }

  hide() {
    this.setState({
      isVisible: false,
    });
  }

  renderTooltip() {
    if (!this.state.isVisible) {
      return null;
    }

    return (
      <div className={bem('tooltip')}>
        {this.props.tooltip(this.hide)}
      </div>
    );
  }

  render() {
    const withProps = React.cloneElement(
      this.props.children,
      {
        isTooltipOpen: this.state.isVisible,
      },
    );

    return (
      <div
        className={classnames(this.props.className, bem(), 'text-left')}
        ref={(ref) => {
          this.el = ref;
        }}
      >
        <div className={bem('activator')} onClick={this.show}>
          {withProps}
        </div>
        {this.renderTooltip()}
      </div>
    );
  }
}

Tooltip.defaultProps = {
  className: '',
  disabled: false,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

Tooltip.TooltipContent = TooltipContent;
