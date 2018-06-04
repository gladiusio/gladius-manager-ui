import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import bemify from '../util/bemify';

const bem = bemify('star-rating');

export default function StarRating(props) {
  const rounded = Math.round(props.rating);
  const children = [];

  /* eslint no-plusplus: "off" */
  for (let i = 1; i <= 5; i++) {
    const el = (
      <span
        className={classnames({
          [bem('star', 'on')]: i <= rounded,
          [bem('star')]: true,
        })}
      />
    );

    children.push(el);
  }

  return (
    <div className={bem()}>
      {children}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};
