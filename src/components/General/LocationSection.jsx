import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  StateCountyTop10,
  StatsPie,
  CountryHistoricalChart,
} from '../Covid';

const LocationSection = ({
  selectedLocation,
  locString,
}) => (
  <Fragment>
    {locString &&
      <h1 style={{ marginBottom: 0, marginTop: 15 }}>
        {locString}
      </h1>}
    {selectedLocation &&
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          width: '100%',
          marginTop: 25,
        }}
      >
        <StatsPie data={selectedLocation} />
        <CountryHistoricalChart country={selectedLocation.country} />
        <StateCountyTop10 selectedLocation={selectedLocation} />
      </div>}
  </Fragment>
);

LocationSection.defaultProps = {
  selectedLocation: undefined,
};

LocationSection.propTypes = {
  selectedLocation: PropTypes.shape({
    country: PropTypes.string,
  }),
  locString: PropTypes.string.isRequired,
};

export default LocationSection;
