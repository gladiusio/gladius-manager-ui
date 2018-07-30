import classnames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import bemify from '../../util/bemify';

const bem = bemify('dashboard-navigation');
export default function SubNavigation() {
  // TODO: add settings back.
  // <li className={bem('item')}>
  //   <NavLink
  //     to="/dashboard/settings"
  //     activeClassName={bem('link', 'active')}
  //     className={classnames(bem('link'), bem('link-settings'))}
  //   >
  //     Settings
  //   </NavLink>
  // </li>

  return (
    <div className={classnames(bem(), 'text-center')}>
      <ul className={classnames(bem('list'))}>
        <li className={bem('item')}>
          <NavLink
            to="/dashboard/home"
            activeClassName={bem('link', 'active')}
            className={classnames(bem('link'), bem('link-dashboard'))}
          >
            Dashboard
          </NavLink>
        </li>
        <li className={bem('item')}>
          <NavLink
            to="/dashboard/transactions"
            activeClassName={bem('link', 'active')}
            className={classnames(bem('link'), bem('link-transactions'))}
          >
            Transactions
          </NavLink>
        </li>
        <li className={bem('item')}>
          <NavLink
            to="/dashboard/marketplace"
            activeClassName={bem('link', 'active')}
            className={classnames(bem('link'), bem('link-marketplace'))}
          >
            Marketplace
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
