import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getElementType from '../../../util/getElementType';
import TableBody from './tableBody';
import TableCell from './tableCell';
import TableHeader from './tableHeader';
import TableHeaderCell from './tableHeaderCell';
import TableRow from './tableRow';

export default function Table(props) {
  const {
    celled,
    children,
    className,
    sortable,
    ...rest
  } = props;
  const Element = getElementType(Table, props);
  const classes = classnames(
    'table',
    {
      celled,
      sortable,
    },
    className,
  );

  return (
    <Element
      {...rest}
      className={classes}
    >
      {children}
    </Element>
  );
}

Table.defaultProps = {
  as: 'table',
  celled: false,
  children: [],
  className: '',
  sortable: false,
};

Table.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Table may be divided into separate cells
  celled: PropTypes.bool,

  // Main content
  children: PropTypes.node,

  // Additional classes
  className: PropTypes.string,

  // Table may be sorted by allowing user to click on a table header cell
  sortable: PropTypes.bool,
};

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;
