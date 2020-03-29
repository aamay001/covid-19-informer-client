/* globals window */
import { ROUTES } from '../config/constants';
import {
  SET_CURRENT_ROUTE,
  TOGGLE_MOBILE_MENU,
  GELOCATION_DATA_ERROR,
  GEOLOCATION_DATA_RECEIVED,
  GETTING_GEOLOCATION_DATA,
} from '../actions/app.actions';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

const initialState = {
  currentRoute: ROUTES.HOME.NAME,
  showMobileMenu: false,
  gettingGeolocationData: false,
  successGettingGeolocationData: false,
  geolocationData: undefined,
  errorGettingGeolocationData: false,
};

const scrollToTopOfPage = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const setCurrentRoute = (state, action) => ({
  ...state,
  currentRoute: action.currentRoute,
});

const routeChanged = (state) => {
  scrollToTopOfPage();
  return {
    ...state,
    showMobileMenu: false,
  };
};

const callHistoryMethod = (state) => {
  scrollToTopOfPage();
  return {
    ...state,
  };
};

const toggleMobileMenu = state => ({
  ...state,
  showMobileMenu: !state.showMobileMenu,
});

const geolocationDataError = state => ({
  ...state,
  gettingGeolocationData: false,
  successGettingGeolocationData: false,
  geolocationData: undefined,
  errorGettingGeolocationData: true,
});

const successGettingGeolocationData = (state, action) => ({
  ...state,
  gettingGeolocationData: false,
  successGettingGeolocationData: true,
  geolocationData: action.data,
  errorGettingGeolocationData: false,
});

const gettingGeolocationData = state => ({
  ...state,
  gettingGeolocationData: true,
  successGettingGeolocationData: false,
  geolocationData: undefined,
  errorGettingGeolocationData: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ROUTE:
      return setCurrentRoute(state, action);
    case LOCATION_CHANGE:
      return routeChanged(state);
    case CALL_HISTORY_METHOD:
      return callHistoryMethod(state);
    case TOGGLE_MOBILE_MENU:
      return toggleMobileMenu(state);
    case GELOCATION_DATA_ERROR:
      return geolocationDataError(state);
    case GEOLOCATION_DATA_RECEIVED:
      return successGettingGeolocationData(state, action);
    case GETTING_GEOLOCATION_DATA:
      return gettingGeolocationData(state);
    default:
      return state;
  }
};
