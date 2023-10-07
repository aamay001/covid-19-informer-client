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

export const loadCovidData = () => (dispatch) => {
  dispatch(gettingCovidData());
  api.GetAllCountries()
    .then((countries) => {
      if (countries) {
        api.GetAllCounties()
          .then((counties) => {
            if (counties) {
              dispatch(covidDataReceived(countries, {}, counties));
            } else {
              dispatch(covidDataReceived(countries, {}));
            }
          });
      } else {
        dispatch(errorGettingCovidData());
      }
    })
    .catch(() => {
      dispatch(errorGettingCovidData());
    });
};
