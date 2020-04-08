import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  GlobalHistoricalChart,
  GlobalStatsPie,
  GlobalTop10,
  WHONewsFeed,
} from '../Covid';

const GlobalSection = ({
  countries,
  successGettingData,
  gettingCovidData,
}) => (
  <Fragment>
    <h1 style={{ marginBottom: 0, marginTop: 5 }}>
      Global Stats
    </h1>
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
      {!gettingCovidData && successGettingData && countries &&
        <Fragment>
          <GlobalHistoricalChart />
          <GlobalTop10 data={countries} />
          <GlobalStatsPie />
          <WHONewsFeed />
        </Fragment>}
    </div>
  </Fragment>
);

GlobalSection.propTypes = {
  gettingCovidData: PropTypes.bool.isRequired,
  successGettingData: PropTypes.bool.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  gettingCovidData: state.covid.gettingData,
  successGettingData: state.covid.successGettingData,
  countries: state.covid.countries,
});

export default connect(mapStateToProps)(GlobalSection);
