import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TransactionsTable from '../transactionsTable';
import bemify from '../../util/bemify';

const bem = bemify('transactions');

class BaseTransactions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classnames(bem(), 'col-9 pt-5')}>
        <div className="row justify-content-between">
          <TransactionsTable />
        </div>
      </div>
    );
  }
}

BaseTransactions.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(null, null)(BaseTransactions);
