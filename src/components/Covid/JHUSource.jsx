import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';
import { theme } from '../../config';

const JHUSource = ({ date }) => (
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
        <a href="https://coronavirus.jhu.edu/" target="_blank" rel="noopener noreferrer">
          {'JHU '}
        </a>
        via
        <a href="https://github.com/novelcovid/api" target="_blank" rel="noopener noreferrer">
          {' NovelCovid/API'}
        </a>
      </p>}
    <style>
      {`
        a, a:active, a:visited, a:hover, a:focus {
          color: ${theme.palette.themeTertiary};
          text-decoration: none;
        }
      `}
    </style>
  </div>
);

JHUSource.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default JHUSource;
