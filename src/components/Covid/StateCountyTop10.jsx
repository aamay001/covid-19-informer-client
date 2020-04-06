import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'office-ui-fabric-react';
import { theme } from '../../config';
import JHUSource from './JHUSource';

const StateCountyTop10 = ({ selectedLocation, counties, jhuData }) => {
  if (selectedLocation && ['US', 'USA'].includes(selectedLocation.country) && counties) {
    let sortedData;
    let isCounties = false;
    if (selectedLocation.province) {
      isCounties = true;
      sortedData = counties.data
        .filter(c => c.province === selectedLocation.province)
        .sort((a, b) => b.stats.confirmed - a.stats.confirmed)
        .slice(0, 10);
    } else {
      sortedData = jhuData
        .filter(c => c.country === 'US' && c.province !== null)
        .sort((a, b) => b.stats.confirmed - a.stats.confirmed )
        .slice(0, 10);
    }
    return (
      <div
        className="c19i-chart-container"
        style={{
          justifyContent: 'space-between',
          marginTop: 0,
        }}
      >
        <div>
          <Text>
            <h2
              style={{
                margin: 0,
                color: theme.palette.black,
                paddingTop: 5,
              }}
            >
              {`Top 10 ${isCounties ? 'Counties' : 'States'} in ${isCounties ? 'State' : 'Country'}`}
            </h2>
          </Text>
        </div>
        <div style={{ width: '100%' }}>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: 0,
              marginBottom: 0,
            }}
            id="c19i-statecounty-top10-item"
          >
            {sortedData.map(item => (
              <li key={item.county}>
                <span>
                  {item.county || item.province}
                </span>
                <span>{new Intl.NumberFormat().format(item.stats.confirmed)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <JHUSource date={counties.date} />
        </div>
        <style>
          {`
            #c19i-statecounty-top10-item li {
              list-style: none;
              border-bottom: 1px solid ${theme.palette.neutralTertiary};
              height: 27px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding-left: 10px;
              padding-right: 10px;
              font-size: ${theme.fonts.medium.fontSize};
              outline: none;
            }
            #c19i-statecounty-top10-item li span {
              color: ${theme.palette.black} !important;
            }
          `}
        </style>
      </div>
    );
  }
  return null;
};

StateCountyTop10.defaultProps = {
  counties: undefined,
};

StateCountyTop10.propTypes = {
  selectedLocation: PropTypes.shape({
    province: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  counties: PropTypes.PropTypes.shape({
    date: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }),
  jhuData: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = state => ({
  counties: state.covid.counties,
  jhuData: state.covid.jhuData,
});

export default connect(mapStateToProps)(StateCountyTop10);
