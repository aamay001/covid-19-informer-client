/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Callout,
  DirectionalHint,
} from 'office-ui-fabric-react';
import { compareTwoStrings } from 'string-similarity';
import {
  getLocationString,
} from '../../helpers/general.helper';
import { theme } from '../../config';

const ResultMemo = new Map();
const RefMap = new Map();

const SearchSuggestions = ({
  searchTerm,
  jhuData,
  show,
  onItemSelected,
  selectionMade,
  focusIndex,
  onIncrementFocusIndex,
  onDecrementFocusIndex,
  pickFirst,
}) => {
  useEffect(() => {
    const elementRef = RefMap.get(focusIndex);
    if (elementRef) {
      elementRef.focus();
    }
  }, [focusIndex]);
  if (searchTerm.length < 3 || selectionMade || !show) {
    RefMap.clear();
    return '';
  }
  let filteredResults = ResultMemo.get(searchTerm);
  if (!filteredResults) {
    const st = searchTerm.toLowerCase().replace(/\W/g, ' ').split(' ');
    const stl = searchTerm.replace(' County', '').toLowerCase();
    filteredResults = jhuData.filter((item) => {
      let { city, province, country } = item;
      city = city && city.toLowerCase();
      province = province && province.toLowerCase();
      country = country && country.toLowerCase();
      if (st.includes(city) || st.includes(province) ||
        st.includes(country) || (country || '').startsWith(stl) ||
        (province || '').startsWith(stl) || (city || '').startsWith(stl)) {
        return true;
      }
      return false;
    }).sort((a, b) =>
      compareTwoStrings(stl, getLocationString(b).toLocaleLowerCase()) -
        compareTwoStrings(stl, getLocationString(a).toLocaleLowerCase()))
      .slice(0, 14);
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
        <Callout
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
              const { city, province, country } = item;
              const locString = getLocationString({ country, province, city });
              return (
                <li
                  key={`${country}${province}${city}`}
                  ref={ref => RefMap.set(index + 2, ref)}
                  tabIndex={index + 2}
                  onClick={() => onItemSelected(item)}
                  onKeyUp={({ keyCode, shiftKey }) => {
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
        </Callout>}
      <style>
        {`
          #c19i-search-suggestions li {
            list-style: none;
            border-bottom: 1px solid ${theme.palette.neutralQuaternary};
            height: 30px;
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
            color: white !important;
          }
          #c19i-search-suggestions li:last-child {
            border-bottom: 0px;
          }
          #c19i-search-suggestions li:hover {
            background-color: ${theme.palette.themeLighterAlt}
          }
        `}
      </style>
    </Fragment>
  );
};

SearchSuggestions.defaultProps = {
  searchTerm: '',
  jhuData: [],
};

SearchSuggestions.propTypes = {
  searchTerm: PropTypes.string,
  jhuData: PropTypes.arrayOf(PropTypes.shape({})),
  show: PropTypes.bool.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  selectionMade: PropTypes.bool.isRequired,
  focusIndex: PropTypes.number.isRequired,
  onIncrementFocusIndex: PropTypes.func.isRequired,
  onDecrementFocusIndex: PropTypes.func.isRequired,
  pickFirst: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  jhuData: state.covid.jhuData,
});

export default connect(mapStateToProps)(SearchSuggestions);
