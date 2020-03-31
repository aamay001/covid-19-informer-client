import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'office-ui-fabric-react';
import SearchSuggestions from './SearchSuggestions';
import { getLocationString } from '../../helpers/general.helper';

const LocationSearch = ({
  searchTerm,
  onSelection,
}) => {
  const [actualSearchTerm, setSearchTerm] = useState(searchTerm || '');
  const [state, setState] = useState({ isFocused: false, selectionMade: false });
  const { isFocused, selectionMade } = state;
  return (
    <Fragment>
      <SearchBox
        id="c19i-search-box"
        placeholder="Location Search"
        value={actualSearchTerm}
        onFocus={() =>
          setState({ ...state, isFocused: true })}
        onBlur={() =>
          setState({ ...state, isFocused: false })}
        onChange={(e, value) => {
          setSearchTerm(value);
          setState({
            ...state,
            selectionMade: false,
          });
        }}
        styles={{
          root: {
            paddingTop: 0,
            paddingBottom: 0,
          },
          field: {
            lineHeight: 1,
          },
        }}
      />
      <SearchSuggestions
        show={isFocused}
        selectionMade={selectionMade}
        searchTerm={actualSearchTerm}
        onItemSelected={(item) => {
          setSearchTerm(getLocationString(item));
          setState({
            ...state,
            isFocused: false,
            selectionMade: true,
          });
          onSelection(item);
        }}
      />
    </Fragment>
  );
};

LocationSearch.defaultProps = {
  searchTerm: '',
};

LocationSearch.propTypes = {
  searchTerm: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
};

export default LocationSearch;
