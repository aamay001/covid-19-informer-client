import { push } from 'react-router-redux';
import { ROUTES } from '../config/constants';

export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';
export const setCurrentRoute = currentRoute => ({
  type: SET_CURRENT_ROUTE,
  currentRoute,
});

export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';
export const toggleMobileMenu = () => ({
  type: TOGGLE_MOBILE_MENU,
});

export const routeToLanding = () => (dispatch) => {
  dispatch(push(ROUTES.HOME.PATH));
};

export const routeToLogin = () => (dispatch) => {
  dispatch(push(ROUTES.LOGIN.PATH));
};
