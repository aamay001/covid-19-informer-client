/* eslint-disable no-console */
import api from '../helpers/api.helper';

export const GETTING_COVID_DATA = 'GETTING_COVID_DATA';
const gettingCovidData = () => ({
  type: GETTING_COVID_DATA,
});

export const COVID_DATA_RECEIVED = 'COVID_DATA_RECEIVED';
const covidDataReceived = (countries, jhuData, counties) => ({
  type: COVID_DATA_RECEIVED,
  countries,
  jhuData,
  counties,
});

export const ERROR_GETTING_COVID_DATA = 'ERROR_GETTING_COVID_DATA';
const errorGettingCovidData = () => ({
  type: ERROR_GETTING_COVID_DATA,
});

export const loadCovidData = () => async (dispatch) => {
  dispatch(gettingCovidData());

  let countries = [];
  const jhuData = [];
  let counties = {};

  try {
    countries = await api.GetAllCountries();
  } catch (err) {
    countries = [];
    console.error('Error loading countries.', err);
  }

  // try {
  //   jhuData = await api.GetAllJHUData();
  // } catch (err) {
  //   jhuData = [];
  //   console.error('Error loading JHUData.', err);
  // }

  try {
    counties = await api.GetAllUSStates();
  } catch (err) {
    counties = [];
    console.error('Error loading counties', err);
  }

  if (!counties && !countries) {
    dispatch(errorGettingCovidData());
  } else {
    dispatch(covidDataReceived(countries, jhuData, counties));
  }
};
