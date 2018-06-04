import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from './tableCell';

export default function TableHeaderCell(props) {
  const {
    as,
    className,
    sorted,
    ...rest
  } = props;
  const classes = classnames(
    className,
    {
      [sorted]: true,
    },
  );

  return (
    <TableCell
      {...rest}
      as={as}
      className={classes}
    />
  );
}

TableHeaderCell.defaultProps = {
  as: 'th',
  className: '',
  sorted: '',
};

TableHeaderCell.propTypes = {
  // Element type to render as
  as: PropTypes.string,

  // Additional classes
  className: PropTypes.string,

  // Header cell can be sorted in ascending or descending order
  sorted: PropTypes.oneOf(['asc', 'desc']),
};
