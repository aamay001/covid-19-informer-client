/* globals window */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'office-ui-fabric-react';
import uuid from 'uuid/v4';
import { theme } from '../../config';
import JHUSource from './JHUSource';
import flags from '../../helpers/flag.helper';

const StateCountyTop10 = ({ selectedLocation, counties }) => {
  const isAcceptableCountry = [
    'US',
    'USA',
  ].includes(selectedLocation.country);
  const isUSA = ['US', 'USA'].includes(selectedLocation.country);
  if (selectedLocation && isAcceptableCountry && counties) {
    let sortedData;
    if (isUSA && counties && counties.data) {
      sortedData = counties.data
        .sort((a, b) => b.cases - a.cases)
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
              Top 10 States Country
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
                // eslint-disable-next-line react/no-unknown-property
                is-province="true"
                key={uuid()}
                onKeyPress={({ keyCode }) => {
                  if (keyCode === 13 || keyCode === 32) {
                    window.location = `/see/${item.state}, ${selectedLocation.country}`;
                  }
                }}
                onClick={() => {
                  window.location = `/see/${item.state}, ${selectedLocation.country}`;
                }}
              >
                <span>
                  {isUSA &&
                    <img
                      src={flags.getUSStateFlagUrl(item.state)}
                      alt="State flag."
                      style={{
                        height: 17,
                        marginRight: 10,
                        opacity: 0.85,
                      }}
                    />}
                  {item.state}
                </span>
                <span>{new Intl.NumberFormat().format(item.cases)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <JHUSource date={new Date().toDateString()} />
        </div>
        <style>
          {`
            #c19i-statecounty-top10-item li {
              list-style: none;
              border-bottom: 1px solid ${theme.palette.neutralTertiary};
              height: 30px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding-left: 10px;
              padding-right: 10px;
              font-size: ${theme.fonts.medium.fontSize};
              outline: none;
            }
            #c19i-statecounty-top10-item li[is-province="true"] {
              cursor: pointer;
            }
            #c19i-statecounty-top10-item li span {
              color: ${theme.palette.black} !important;
            }
            #c19i-statecounty-top10-item li[is-province="true"]:hover,
            #c19i-statecounty-top10-item li[is-province="true"]:hover * {
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
  counties: PropTypes.oneOfType([
    PropTypes.PropTypes.shape({
      date: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
    }),
    PropTypes.array,
  ]),
};

const mapStateToProps = state => ({
  counties: state.covid.counties,
});

export default connect(mapStateToProps)(StateCountyTop10);
