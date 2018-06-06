import React from 'react';
import PropTypes from 'prop-types';
import bemify from '../util/bemify';

const bem = bemify('drawer-content-split');

export default function DrawerContentSplit(props) {
  return (
    <div className={bem()}>
      <div className={bem('drawer')} />
      <div className={bem('content')}>
        {props.children}
      </div>
    </div>
  );
}

DrawerContentSplit.propTypes = {
  children: PropTypes.node.isRequired,
};
