import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from './shared/tooltip';
import CountryList from './countryList';
import bemify from '../util/bemify';
import Input from './input';
import { searchField } from '../sharedClassNames';
import { stateField } from '../util/fieldManager';
import { COUNTRY_CODES } from '../util/countries';
import noop from '../util/noop';

const bem = bemify('country-tooltip');

class CountryTooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPristine: true,
      filter: '',
      selected: props.selected,
    };

    this.onSelect = this.onSelect.bind(this);
    this.apply = this.apply.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      selected: props.selected,
    });
  }

  onSelect(code) {
    const selected = [].concat(this.state.selected);
    const idx = selected.indexOf(code);

    if (idx > -1) {
      selected.splice(idx, 1);
    } else {
      selected.push(code);
    }

    this.setState({
      selected,
      isPristine: false,
    });
  }

  clear() {
    this.setState({
      selected: [],
      isPristine: true,
    });

    this.props.onApply([]);
    this.props.onClear();
  }

  apply() {
    this.setState({
      isPristine: true,
    });

    this.props.onApply(this.state.selected);
  }

  render() {
    return (
      <Tooltip.TooltipContent
        onSubmit={this.apply}
        onCancel={this.clear}
        disableSubmit={this.state.isPristine}
        submitText="Apply"
        cancelText="Clear"
        noPadding
      >
        <div className={bem()}>
          <div className={classnames(bem('filter-box'), 'p-3')}>
            <Input
              {...stateField(this, 'filter')}
              wrapperClassName="my-0"
              className={searchField}
              placeholder="Filter..."
              autoFocus
            />
          </div>
          <div className={bem('list-scroll')}>
            <CountryList
              filter={this.state.filter}
              selected={this.state.selected}
              onSelect={this.onSelect}
            />
          </div>
        </div>
      </Tooltip.TooltipContent>
    );
  }
}

CountryTooltip.defaultProps = {
  onClear: noop,
};

CountryTooltip.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.oneOf(COUNTRY_CODES)).isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};

export default CountryTooltip;
