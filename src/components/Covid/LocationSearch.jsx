import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'office-ui-fabric-react';
import SearchSuggestions from './SearchSuggestions';
import { getLocationString } from '../../helpers/general.helper';

const incrementFocusIndex = (index, setState, state, max) =>
  setState({ ...state, focusIndex: Math.min(max, index + 1) });

const decrementFocusIndex = (index, setState, state, min = 1) =>
  setState({ ...state, focusIndex: Math.max(min, index - 1) });

const LocationSearch = ({
  searchTerm,
  onSelection,
}) => {
  const inputRef = useRef(null);
  const [actualSearchTerm, setSearchTerm] = useState(searchTerm || '');
  const [state, setState] = useState({
    isFocused: false,
    selectionMade: false,
    focusIndex: -1,
  });
  const {
    isFocused,
    selectionMade,
    focusIndex,
  } = state;
  useEffect(() => {
    if (inputRef && focusIndex === 1) {
      inputRef.current.focus();
    }
  });
  return (
    <Fragment>
      <SearchBox
        id="c19i-search-box"
        placeholder="Location Search"
        componentRef={inputRef}
        value={actualSearchTerm}
        tabIndex={Number(1)}
        onKeyUp={({ keyCode }) => {
          if (keyCode === 40) { // Down Arrow
            incrementFocusIndex(focusIndex, setState, state, 5);
          } else if (keyCode === 38) { // Up Arrow
            decrementFocusIndex(focusIndex, setState, state);
          }
        }}
        onFocus={() =>
          setState({
            ...state,
            isFocused: true,
            focusIndex: 1,
          })}
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
        show={isFocused || !selectionMade}
        selectionMade={selectionMade}
        focusIndex={focusIndex}
        onIncrementFocusIndex={(index, max) =>
          incrementFocusIndex(index, setState, state, max)}
        onDecrementFocusIndex={(index, max) =>
          decrementFocusIndex(index, setState, state, max)}
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
