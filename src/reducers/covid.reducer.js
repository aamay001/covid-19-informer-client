import {
  GETTING_COVID_DATA,
  COVID_DATA_RECEIVED,
  ERROR_GETTING_COVID_DATA,
} from '../actions/covid.actions';

const initialState = {
  gettingData: false,
  errorGettingData: false,
  successGettingData: false,
  countries: [],
  jhuData: [],
  counties: [],
};

const gettingCovidData = state => ({
  ...state,
  gettingData: true,
  errorGettingData: false,
  successGettingData: false,
});

const successGettingCovidData = (state, { countries, jhuData, counties }) => ({
  ...state,
  gettingData: false,
  errorGettingData: false,
  successGettingData: true,
  countries,
  jhuData,
  counties,
});

const errorGettingDataCovidData = state => ({
  ...state,
  gettingDate: false,
  errorGettingData: true,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_COVID_DATA:
      return gettingCovidData(state);
    case COVID_DATA_RECEIVED:
      return successGettingCovidData(state, action);
    case ERROR_GETTING_COVID_DATA:
      return errorGettingDataCovidData(state);
    default:
      return state;
  }
};
