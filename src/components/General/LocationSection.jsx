import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  StateCountyTop10,
  StatsPie,
  CountryHistoricalChart,
} from '../Covid';
import flags from '../../helpers/flag.helper';

const LocationSection = ({
  selectedLocation,
  locString,
}) => (
  <Fragment>
    {locString &&
      <h1 style={{ marginBottom: 0, marginTop: 15 }}>
        {((selectedLocation.countryInfo && selectedLocation.countryInfo.flag) ||
        flags.getUSStateFlagUrl(selectedLocation.state)) &&
          <span style={{ verticalAlign: 'top' }}>
            <img
              src={(selectedLocation.countryInfo &&
                selectedLocation.countryInfo.flag) ||
                flags.getUSStateFlagUrl(selectedLocation.state)}
              alt="Country flag"
              style={{
                height: 25,
                marginRight: 7,
              }}
            />
          </span>}
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
    province: PropTypes.string,
    state: PropTypes.string,
    countryInfo: PropTypes.shape({
      flag: PropTypes.string,
    }),
  }),
  locString: PropTypes.string.isRequired,
};

export default LocationSection;
