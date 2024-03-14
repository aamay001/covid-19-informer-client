/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Callout,
  DirectionalHint,
} from 'office-ui-fabric-react';
import { compareTwoStrings } from 'string-similarity';
import union from 'lodash.union';
import {
  getLocationString,
} from '../../helpers/general.helper';
import { theme } from '../../config';

const ResultMemo = new Map();
const RefMap = new Map();

const SearchSuggestions = ({
  searchTerm,
  counties,
  countries,
  show,
  onItemSelected,
  selectionMade,
  focusIndex,
  onIncrementFocusIndex,
  onDecrementFocusIndex,
  pickFirst,
}) => {
  const [mergedData, setData] = useState(undefined);
  useEffect(() => {
    const elementRef = RefMap.get(focusIndex);
    if (elementRef) {
      elementRef.focus();
    }
  }, [focusIndex]);
  const isDataReady = !!mergedData;
  useEffect(() => {
    let mergedSearchData;
    const states = counties && counties.data && counties.data.map(s => ({
      country: 'USA',
      state: s.state,
      stats: {
        cases: s.cases,
        recovered: s.recovered,
        deaths: s.deaths,
      },
      updatedAt: new Date(s.updated).toString(),
      wom: false,
    }));
    try {
      mergedSearchData = union(
        states,
        countries.map((c) => {
          const merged = {
            ...c,
            stats: {
              cases: c.cases,
              recovered: c.recovered,
              deaths: c.deaths,
            },
            updatedAt: new Date(c.updated).toString(),
            wom: true,
          };
          delete merged.cases;
          delete merged.updated;
          delete merged.deaths;
          delete merged.recovered;
          return merged;
        }),
      );
    } catch (err) {
      console.error(err);
    }

    setData(mergedSearchData);
  }, [isDataReady, countries, counties]);
  if (searchTerm.trim().length < 2 || selectionMade || !show || !isDataReady) {
    RefMap.clear();
    return '';
  }
  let filteredResults = ResultMemo.get(searchTerm);
  if (!filteredResults) {
    const st = searchTerm.trim().toLowerCase().replace(/\W/g, ' ').split(' ');
    const stl = searchTerm.trim().replace(' County', '').toLowerCase();
    filteredResults = mergedData.filter((item) => {
      let { state, country } = item;
      state = state && state.toLowerCase();
      country = country && country.toLowerCase();
      if (st.includes(state) ||
        st.includes(country) || (country || '').includes(stl) ||
        (state || '').includes(stl)) {
        return true;
      }
      return false;
    }).sort((a, b) =>
      compareTwoStrings(stl, getLocationString(b).toLowerCase()) -
        compareTwoStrings(stl, getLocationString(a).toLowerCase()))
      .slice(0, 9);
    if (filteredResults.length > 0) {
      ResultMemo.set(searchTerm, filteredResults);
      if (pickFirst && filteredResults.length > 0) {
        setTimeout(() => {
          onItemSelected(filteredResults[0]);
        }, 100);
      }
    }
  }
  return (
    <Fragment>
      {(!pickFirst && ((show && filteredResults.length > 0) ||
        (filteredResults.length > 0))) &&
        <Fragment>
          <Callout
            isBloc
            target="#c19i-search-box"
            isBeakVisible={false}
            directionalHint={DirectionalHint.bottomLeftEdge}
            directionalHintFixed
            calloutWidth="90%"
            calloutMaxWidth={710}
            gapSpace={3}
            coverTarget={false}
            styles={{
              calloutMain: {
                left: '-5px',
                width: '101%',
              },
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                marginTop: 0,
                marginBottom: 0,
              }}
              id="c19i-search-suggestions"
            >
              {filteredResults.map((item, index) => {
                const { state, country } = item;
                const locString = getLocationString({ country, state });
                return (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${country}${state}-${index}`}
                    ref={ref => RefMap.set(index + 2, ref)}
                    tabIndex={index + 2}
                    onClick={() => onItemSelected(item)}
                    onKeyUp={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      const { keyCode, shiftKey } = event;
                      if (keyCode === 13 || keyCode === 32) {
                        // Enter || Space
                        onItemSelected(item);
                      } else if (keyCode === 38 || (keyCode === 9 && shiftKey)) {
                        // Up Arrow || Shift + Tab
                        onDecrementFocusIndex(focusIndex);
                      } else if (keyCode === 40 || keyCode === 9) {
                        // Down Arrow || Tab
                        onIncrementFocusIndex(focusIndex, filteredResults.length + 1);
                      }
                    }}
                    role="button"
                  >
                    {locString}
                  </li>
                );
              })}
            </ul>
          </Callout>
          <style>
            {`html {
              width: 100vw !important;
              height: 100vh !important;
              overflow: hidden !important;
            }`}
          </style>
        </Fragment>}
      <style>
        {`
          #c19i-search-suggestions li {
            list-style: none;
            border-bottom: 1px solid ${theme.palette.neutralTertiary};
            height: 45px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 10px;
            margin-bottom: 1px;
            font-size: ${theme.fonts.medium.fontSize};
            cursor: pointer;
            outline: none;
          }
          #c19i-search-suggestions li:focus {
            background-color: ${theme.palette.themeSecondary};
            color: white;
          }
          #c19i-search-suggestions li:last-child {
            border-bottom: 0px;
          }
          #c19i-search-suggestions li:hover {
            background-color: ${theme.palette.themeSecondary};
            color: white;
          }
        `}
      </style>
    </Fragment>
  );
};

SearchSuggestions.defaultProps = {
  searchTerm: '',
  counties: [],
  countries: [],
};

SearchSuggestions.propTypes = {
  searchTerm: PropTypes.string,
  counties: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    date: PropTypes.string,
  }),
  show: PropTypes.bool.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  selectionMade: PropTypes.bool.isRequired,
  focusIndex: PropTypes.number.isRequired,
  onIncrementFocusIndex: PropTypes.func.isRequired,
  onDecrementFocusIndex: PropTypes.func.isRequired,
  pickFirst: PropTypes.bool.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = state => ({
  counties: state.covid.counties,
  countries: state.covid.countries,
});

export default connect(mapStateToProps)(SearchSuggestions);
