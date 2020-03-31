import axios from 'axios';
import { differenceInHours } from 'date-fns';
import settings from '../config/settings';
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
  if (cachedData && differenceInHours(cachedData.date, new Date()) > 8) {
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
  if (cachedData && differenceInHours(cachedData.date, new Date()) > 8) {
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

export default {
  GetUserLocationDetail,
  GetAllCountries,
  GetAllJHUData,
};
