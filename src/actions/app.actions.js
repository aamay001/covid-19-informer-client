import { push } from 'react-router-redux';
import { ROUTES } from '../config/constants';
import api from '../helpers/api.helper';

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

export const GETTING_GEOLOCATION_DATA = 'GETTING_GEOLOCATION_DATA';
export const gettingGeolocationDate = () => ({
  type: GETTING_GEOLOCATION_DATA,
});

export const GEOLOCATION_DATA_RECEIVED = 'GEOLOCATION_DATA_RECEIVED';
export const geolocationDataReceived = data => ({
  type: GEOLOCATION_DATA_RECEIVED,
  data,
});

export const GELOCATION_DATA_ERROR = 'GELOCATION_DATA_ERROR';
export const geolocationDataError = () => ({
  type: GELOCATION_DATA_ERROR,
});

export const getGeolocData = (lat, long) => (dispatch) => {
  dispatch(gettingGeolocationDate());
  api.GetUserLocationDetail(lat, long)
    .then((ld) => {
      if (ld) {
        dispatch(geolocationDataReceived(ld));
      } else {
        dispatch(geolocationDataError());
      }
    });
};
