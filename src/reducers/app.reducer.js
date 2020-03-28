/* globals window */
import { ROUTES } from '../config/constants';
import {
  SET_CURRENT_ROUTE,
  TOGGLE_MOBILE_MENU,
} from '../actions/app.actions';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

const initialState = {
  currentRoute: ROUTES.HOME.NAME,
  showMobileMenu: false,
  gettingUserPermissions: true,
  errorGettingUserPermissions: false,
  userPermissionError: undefined,
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
    default:
      return state;
  }
};
