import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../config';

const WorldOMeterSource = ({ date }) => (
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
        {`${new Date(date).toLocaleDateString()} - `}
        <a href="https://www.worldometers.info/coronavirus/" target="_blank" rel="noopener noreferrer">
          {'worldometer '}
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

WorldOMeterSource.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default WorldOMeterSource;
