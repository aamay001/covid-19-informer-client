import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';
import { theme } from '../../config';

const CDCSource = ({ date }) => (
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
        <a href="https://www.cdc.gov/" target="_new">
          Centers for Disease Control and Prevention
        </a>
      </p>}
  </div>
);

CDCSource.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default CDCSource;
