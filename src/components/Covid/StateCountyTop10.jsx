/* globals window */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'office-ui-fabric-react';
import uuid from 'uuid/v4';
import { theme } from '../../config';
import JHUSource from './JHUSource';

const getLocalProvinceText = (country) => {
  if (country === 'USA' || country === 'US') {
    return 'States';
  }
  return 'Provinces';
};

const StateCountyTop10 = ({ selectedLocation, counties, jhuData }) => {
  const isAcceptableCountry = [
    'US',
    'USA',
    'France',
    'United Kingdom',
    'UK',
    'Canada',
    'China',
    'Australia',
  ]
    .includes(selectedLocation.country);
  if (selectedLocation && isAcceptableCountry && counties) {
    let sortedData;
    let isCounties = false;
    if (selectedLocation.province && ['US', 'USA'].includes(selectedLocation.country)) {
      isCounties = true;
      sortedData = counties.data
        .filter(c => c.province === selectedLocation.province)
        .sort((a, b) => b.stats.confirmed - a.stats.confirmed)
        .slice(0, 10);
    } else if (jhuData) {
      sortedData = jhuData
        .filter(c => (c.country === selectedLocation.country ||
          (c.country === 'United Kingdom' && selectedLocation.country === 'UK') ||
          (c.country === 'US' && selectedLocation.country === 'USA')) &&
          c.province !== null)
        .sort((a, b) => b.stats.confirmed - a.stats.confirmed)
        .slice(0, 10);
    } else {
      return null;
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
              {`Top 10 ${isCounties ? 'Counties' : getLocalProvinceText(selectedLocation.country)} in ${isCounties ? 'State' : 'Country'}`}
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
              <li
                key={uuid()}
                onKeyPress={({ keyCode }) => {
                  if (keyCode === 13 || keyCode === 32) {
                    window.location = item.county
                      ? `/see/${item.county}, ${item.province}`
                      : `/see/${item.province}`;
                  }
                }}
                onClick={() => {
                  window.location = item.county
                    ? `/see/${item.county}, ${item.province}`
                    : `/see/${item.province}`;
                }}
              >
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
              cursor: pointer;
              margin-top: 1px;
            }
            #c19i-statecounty-top10-item li span {
              color: ${theme.palette.black} !important;
            }
            #c19i-statecounty-top10-item li:hover,
            #c19i-statecounty-top10-item li:hover * {
              background-color: ${theme.palette.themeSecondary};
              color: white !important;
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
  jhuData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  counties: state.covid.counties,
  jhuData: state.covid.jhuData,
});

export default connect(mapStateToProps)(StateCountyTop10);
