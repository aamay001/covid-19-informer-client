import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  SearchBox,
  TeachingBubble,
  DirectionalHint,
} from 'office-ui-fabric-react';
import SearchSuggestions from './SearchSuggestions';
import lsHelper from '../../helpers/localStorage.helper';
import { getLocationString } from '../../helpers/general.helper';
import { STRINGS } from '../../config/constants';
import { theme } from '../../config';

const searchHelperShown = !lsHelper.getItem(STRINGS.LS.SEARCH_LOCATION_HELPER);

const incrementFocusIndex = (index, setState, state, max) =>
  setState({ ...state, focusIndex: Math.min(max, index + 1) });

const decrementFocusIndex = (index, setState, state, min = 1) =>
  setState({ ...state, focusIndex: Math.max(min, index - 1) });

const LocationSearch = ({
  searchTerm,
  onSelection,
  pickFirst,
}) => {
  const inputRef = useRef(null);
  const [actualSearchTerm, setSearchTerm] = useState(searchTerm || '');
  const [state, setState] = useState({
    isFocused: false,
    selectionMade: false,
    focusIndex: -1,
    showSearchHelper: searchHelperShown,
  });
  const {
    isFocused,
    selectionMade,
    focusIndex,
    showSearchHelper,
  } = state;
  useEffect(() => {
    if (inputRef && focusIndex === 1) {
      inputRef.current.focus();
      return;
    }
    if (inputRef && focusIndex === -2) {
      // eslint-disable-next-line no-underscore-dangle
      inputRef.current._inputElement.current.blur();
    }
  });
  return (
    <Fragment>
      <SearchBox
        id="c19i-search-box"
        placeholder="start typing to filter available options"
        componentRef={inputRef}
        value={actualSearchTerm}
        autoComplete="off"
        tabIndex={Number(1)}
        onKeyUp={(event) => {
          event.stopPropagation();
          event.preventDefault();
          const { keyCode } = event;
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
            focusIndex: 1,
          });
        }}
        onClear={() => {
          setState({
            ...state,
            selectionMade: false,
            focusIndex: 1,
          });
          onSelection(undefined);
        }}
        styles={{
          root: {
            paddingTop: 0,
            paddingBottom: 0,
            height: 50,
          },
          field: {
            lineHeight: '1.25',
            height: 50,
          },
        }}
      />
      <SearchSuggestions
        show={isFocused || !selectionMade}
        pickFirst={pickFirst}
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
            focusIndex: -2,
            selectionMade: true,
          });
          onSelection(item);
        }}
      />
      {inputRef && showSearchHelper &&
        <TeachingBubble
          calloutProps={{
            directionalHint: DirectionalHint.bottomCenter,
          }}
          isWide
          closeButtonAriaLabel="Close"
          styles={{
            headline: {
              color: 'white',
            },
            subText: {
              color: 'white',
            },
            primaryButton: {
              backgroundColor: 'white',
            },
            subComponentStyles: {
              callout: {
                calloutMain: {
                  background: theme.palette.darkTheme
                    ? theme.palette.blueDark
                    : undefined,
                },
              },
            },
          }}
          primaryButtonProps={{
            onClick: () => {
              setState({
                ...state,
                showSearchHelper: false,
              });
              lsHelper.setItem(STRINGS.LS.SEARCH_LOCATION_HELPER, true);
            },
            children: 'OK',
          }}
          target="#c19i-search-box"
          headline="Location Search"
        >
          Available data lets you search by Country or Province (State) and Country.
        </TeachingBubble>}
    </Fragment>
  );
};

LocationSearch.defaultProps = {
  searchTerm: '',
  pickFirst: false,
};

LocationSearch.propTypes = {
  searchTerm: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
  pickFirst: PropTypes.bool,
};

export default LocationSearch;
