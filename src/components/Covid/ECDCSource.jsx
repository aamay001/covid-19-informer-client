import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';
import { theme } from '../../config';

const ECDCSource = ({ date }) => (
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
        <a href="https://www.ecdc.europa.eu/" target="_new">
          European Centre for Disease Prevention and Control
        </a>
      </p>}
  </div>
);

ECDCSource.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default ECDCSource;
