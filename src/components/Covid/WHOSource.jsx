import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';
import { theme } from '../../config';

const WHOSource = ({ date }) => (
  <div>
    {date &&
      <p
        style={{
          fontSize: theme.fonts.small.fontSize,
          color: theme.palette.themeTertiary,
          display: 'block',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {`${parse(date).toLocaleDateString()} - `}
        <a href="https://www.who.int/" target="_new">
          World Health Organization
        </a>
      </p>}
  </div>
);

WHOSource.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default WHOSource;
