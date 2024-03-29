/* globals window */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'office-ui-fabric-react';
import { theme } from '../../config';
import WorldOMeterSource from './WorldOMeterSource';

const GlobalTop10 = ({ data }) => {
  const sortedData = data.sort((a, b) => b.cases - a.cases)
    .slice(0, 10);
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
            Top 10 Total Cases
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
          id="c19i-global-top10-item"
        >
          {sortedData.map(item => (
            <li
              key={item.country}
              onKeyPress={({ keyCode }) => {
                if (keyCode === 13 || keyCode === 32) {
                  window.location = `/see/${item.country}`;
                }
              }}
              onClick={() => {
                window.location = `/see/${item.country}`;
              }}
            >
              <span>
                <img
                  src={item.countryInfo.flag}
                  alt="Country flag"
                  style={{
                    height: 17,
                    marginRight: 10,
                    opacity: 0.85,
                  }}
                />
                {item.country}
              </span>
              <span>{new Intl.NumberFormat().format(item.cases)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <WorldOMeterSource date={sortedData[0].updated} />
      </div>
      <style>
        {`
          #c19i-global-top10-item li {
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
            cursor: pointer;
          }
          #c19i-global-top10-item li span {
            color: ${theme.palette.black} !important;
          }
          #c19i-global-top10-item li:hover,
          #c19i-global-top10-item li:hover * {
            background-color: ${theme.palette.themeSecondary};
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

GlobalTop10.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default GlobalTop10;
