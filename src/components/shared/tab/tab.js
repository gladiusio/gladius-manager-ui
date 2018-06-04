import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getElementType from '../../../util/getElementType';
import TabSegment from './tabSegment';
import tabPropType from '../../../propTypes/tab';

/**
 * Wrapper component that renders content (aka segment) activated by a menu item
 */
export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e, index) {
    this.setState({
      activeIndex: index,
    });
  }

  renderMenu() {
    const { segments } = this.props;
    const { activeIndex } = this.state;

    const menuItems = segments.map((m, index) => (
      <Fragment>
        <a
          key={m}
          className={classnames('tab-menu__item', { active: activeIndex === index })}
          onClick={(e) => { this.handleMenuClick(e, index); }}
        >
          {m.menuItem}
        </a>
      </Fragment>
    ));

    // TODO: Create Menu(?) component
    return (
      <div className="tab-menu">
        {menuItems}
      </div>
    );
  }

  renderActiveSegment() {
    const { segments } = this.props;
    const { activeIndex } = this.state;

    // Call the render function with properties on the current segment
    return segments[activeIndex].render(this.props);
  }

  render() {
    const {
      className,
      ...rest
    } = this.props;
    const Element = getElementType(Tab, this.props);
    const classes = classnames(
      'tab',
      className,
    );

    return (
      <Element
        {...rest}
        className={classes}
      >
        {this.renderMenu()}
        {this.renderActiveSegment()}
      </Element>
    );
  }
}

Tab.defaultProps = {
  as: 'div',
  className: '',
};

Tab.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Additional classes
  className: PropTypes.string,

  /**
   * Array of objects for each segment:
   *
   * menuItem: 'This is my tab title',
   * render: () => <Tab.Segment>This is my tab content</Tab.Segment>
   */
  segments: PropTypes.arrayOf(
    tabPropType,
  ).isRequired,
};

Tab.Segment = TabSegment;
