/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Fragment } from 'react';
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

const SearchSuggestions = ({
  searchTerm,
  jhuData,
  show,
  onItemSelected,
  selectionMade,
}) => {
  if (searchTerm.length < 3) {
    return '';
  }
  const st = searchTerm.toLowerCase().replace(/\W/g, ' ').split(' ');
  const stl = searchTerm.replace(' County', '').toLowerCase();
  const filteredResults = jhuData.filter((item) => {
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
    .slice(0, 9);
  return (
    <Fragment>
      {((show && filteredResults.length > 0) ||
        (filteredResults.length > 0)) && !selectionMade &&
        <Callout
          target="#c19i-search-box"
          isBeakVisible={false}
          directionalHint={DirectionalHint.bottomLeftEdge}
          directionalHintFixed
          calloutWidth="90%"
          calloutMaxWidth={725}
          gapSpace={2}
          coverTarget={false}
          shouldRestoreFocus
          styles={{
            calloutMain: {
              left: '-5px',
              width: '101%',
            },
          }}
        >
          <ul
            style={{ listStyle: 'none', padding: 0 }}
            id="c19i-search-suggestions"
          >
            {filteredResults.map((item, index) => {
              const { city, province, country } = item;
              const locString = getLocationString({ country, province, city });
              return (
                <li
                  key={`${country}${province}${city}`}
                  tabIndex={index}
                  onClick={() => onItemSelected(item)}
                  onKeyDown={() => onItemSelected(item)}
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
};

const mapStateToProps = state => ({
  jhuData: state.covid.jhuData,
});

export default connect(mapStateToProps)(SearchSuggestions);
