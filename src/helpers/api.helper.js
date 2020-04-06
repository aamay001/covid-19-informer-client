import axios from 'axios';
import { differenceInHours } from 'date-fns';
import settings, { APP } from '../config/settings';
import strings from '../config/string.constants';
import lsHelper from './localStorage.helper';

const { ADDRESS_COMPONENTS, LS } = strings;

const { API, COVID_API } = settings;
const {
  COUNTRY,
  STATE,
  COUNTY,
  CITY,
} = ADDRESS_COMPONENTS;

const GetUserLocationDetail = async (lat, long) => {
  const config = {
    params: {
      lat,
      long,
      code: API.KEYS.GEOLOCATE,
    },
  };
  const response = await axios.get(API.URL + API.GEOLOCATE, config);
  if (response.status === 202) {
    const locationData = {};
    response.data.forEach((ac) => {
      if (ac.types.includes(COUNTRY)) {
        locationData.longCountry = ac.long_name;
        locationData.country = ac.short_name;
      } else if (ac.types.includes(STATE)) {
        locationData.state = ac.long_name;
        locationData.shortState = ac.short_name;
      } else if (ac.types.includes(COUNTY)) {
        locationData.county = ac.long_name;
        locationData.shortCounty = ac.short_name;
      } else if (ac.types.includes(CITY)) {
        locationData.city = ac.long_name;
        locationData.shortCity = ac.short_name;
      }
    });
    return locationData;
  }
  return false;
};

const GetAllCountries = async () => {
  let cachedData = lsHelper.getItem(LS.CACHED_COUNTRY_DATA);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData.data;
  }
  const response = await axios.get(COVID_API.URL + COVID_API.COUNTRIES);
  if (response.status === 200) {
    lsHelper.setItem(LS.CACHED_COUNTRY_DATA, { date: new Date(), data: response.data });
    return response.data;
  }
  return false;
};

const GetAllJHUData = async () => {
  let cachedData = lsHelper.getItem(LS.CACHED_JHU_DATA);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData.data;
  }
  const response = await axios.get(COVID_API.URL + COVID_API.JHU_CSSE);
  if (response.status === 200) {
    lsHelper.setItem(LS.CACHED_JHU_DATA, { date: new Date(), data: response.data });
    return response.data;
  }
  return false;
};

const GetGlobalTotals = async () => {
  let cachedData = lsHelper.getItem(LS.CACHED_GLOBAL_TOTALS);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData.data;
  }
  const response = await axios.get(COVID_API.URL + COVID_API.GLOBAL_TOTALS);
  if (response.status === 200) {
    lsHelper.setItem(LS.CACHED_GLOBAL_TOTALS, { date: new Date(), data: response.data });
    return response.data;
  }
  return false;
};

const GetGlobalHistorical = async () => {
  let cachedData = lsHelper.getItem(LS.CACHED_GLOBAL_HISTORICAL);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData.data;
  }
  const response = await axios.get(COVID_API.URL + COVID_API.JHU_HISTORICAL_ALL);
  if (response.status === 200) {
    const data = { ...response.data, updated: new Date().toString() };
    lsHelper.setItem(LS.CACHED_GLOBAL_HISTORICAL, { date: new Date(), data });
    return data;
  }
  return false;
};

const GetHistoricalByCountry = async (country) => {
  const cachedData = lsHelper.getItem(LS.CACHED_HISTORICAL_COUNTRY);
  if (cachedData && cachedData[country] &&
      differenceInHours(new Date(), cachedData[country].updated) > APP.DATA_REFRESH_INTERVAL) {
    delete cachedData[country];
  }
  if (cachedData && cachedData[country]) {
    return cachedData[country];
  }
  const response = await axios.get(COVID_API.URL + COVID_API.JHU_HISTORICAL_BY_COUNTRY(country));
  if (response.status === 200) {
    const data = {
      ...(cachedData || {}),
      [country]: {
        data: response.data,
        updated: new Date().toString(),
      },
    };
    lsHelper.setItem(LS.CACHED_HISTORICAL_COUNTRY, data);
    return data[country];
  }
  return false;
};

const GetAllCounties = async () => {
  let cachedData = lsHelper.getItem(LS.CACHED_US_COUNTIES);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData;
  }
  const response = await axios.get(COVID_API.URL + COVID_API.JHU_COUNTIES);
  if (response.status === 200) {
    const data = { data: response.data, date: new Date().toString() };
    lsHelper.setItem(LS.CACHED_US_COUNTIES, data);
    return data;
  }
  return false;
};

export default {
  GetUserLocationDetail,
  GetAllCountries,
  GetAllJHUData,
  GetGlobalTotals,
  GetGlobalHistorical,
  GetHistoricalByCountry,
  GetAllCounties,
};
