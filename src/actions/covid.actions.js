import api from '../helpers/api.helper';

export const GETTING_COVID_DATA = 'GETTING_COVID_DATA';
const gettingCovidData = () => ({
  type: GETTING_COVID_DATA,
});

export const COVID_DATA_RECEIVED = 'COVID_DATA_RECEIVED';
const covidDataReceived = (countries, jhuData) => ({
  type: COVID_DATA_RECEIVED,
  countries,
  jhuData,
});

export const ERROR_GETTING_COVID_DATA = 'ERROR_GETTING_COVID_DATA';
const errorGettingCovidData = () => ({
  type: ERROR_GETTING_COVID_DATA,
});

export const loadCovidData = () => (dispatch) => {
  dispatch(gettingCovidData());
  api.GetAllCountries()
    .then((countries) => {
      if (countries) {
        api.GetAllJHUData()
          .then((jhuData) => {
            if (jhuData) {
              dispatch(covidDataReceived(countries, jhuData));
            } else {
              dispatch(errorGettingCovidData());
            }
          });
      } else {
        dispatch(errorGettingCovidData());
      }
    });
};
