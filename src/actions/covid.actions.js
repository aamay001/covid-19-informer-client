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
  const res = api.GetAllCountries()
    .then((countries) => {
      if (countries) {
        api.GetAllJHUData()
          .then((jhuData) => {
            if (jhuData) {
              api.GetAllCounties()
                .then((counties) => {
                  if (counties) {
                    dispatch(covidDataReceived(countries, jhuData, counties));
                  } else {
                    dispatch(covidDataReceived(countries, jhuData));
                  }
                });
            } else {
              dispatch(errorGettingCovidData());
            }
          });
      } else {
        dispatch(errorGettingCovidData());
      }
    });

  if (!res) {
    // eslint-disable-next-line no-console
    console.error('Error loading data.');
    dispatch(errorGettingCovidData());
  }
};
