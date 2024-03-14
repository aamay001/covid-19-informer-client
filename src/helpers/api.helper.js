/* eslint-disable no-console */
import { differenceInHours } from 'date-fns';
import RssParser from 'rss-parser';
import axios from './axios.helper';
import settings, { APP } from '../config/settings';
import strings from '../config/string.constants';
import lsHelper from './localStorage.helper';

const { ADDRESS_COMPONENTS, LS } = strings;

const {
  API,
  COVID_API,
} = settings;
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
  let response;
  try {
    response = await axios.get(API.URL + API.GEOLOCATE, config);
  } catch (e) {
    console.error(e);
    return false;
  }
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
  let response;
  try {
    response = await axios.get(COVID_API.URL + COVID_API.COUNTRIES);
  } catch (e) {
    console.error(e);
    return false;
  }
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
  let response;
  try {
    response = await axios.get(COVID_API.URL + COVID_API.JHU_CSSE);
  } catch (e) {
    console.error(e);
    return false;
  }
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
  let response;
  try {
    response = await axios.get(COVID_API.URL + COVID_API.GLOBAL_TOTALS);
  } catch (e) {
    console.error(e);
    return false;
  }
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
  let response;
  try {
    response = await axios.get(COVID_API.URL + COVID_API.JHU_HISTORICAL_ALL);
  } catch (e) {
    console.error(e);
    return false;
  }
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
  let response;
  try {
    response = await axios.get(COVID_API.URL + COVID_API.JHU_HISTORICAL_BY_COUNTRY(country));
  } catch (e) {
    console.error('Error loading historical data by country.', e);
    return false;
  }
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

const GetAllUSStates = async () => {
  let cachedData = lsHelper.getItem(LS.CACHED_US_COUNTIES);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData;
  }
  let response;
  try {
    response = await axios.get(COVID_API.URL + COVID_API.US_STATE_TOTALS);
  } catch (e) {
    console.error('Error loading county data.', e);
    return false;
  }
  if (response.status === 200) {
    const data = { data: response.data, date: new Date().toString() };
    lsHelper.setItem(LS.CACHED_US_COUNTIES, data);
    return data;
  }
  return false;
};

const GetWHONews = async () => {
  const rssParser = new RssParser();
  let cachedData = lsHelper.getItem(LS.CACHED_WHO_NEWS);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData;
  }
  let feed;
  try {
    const config = {
      insecureHTTPParser: true,
      timeout: 5000,
      params: {
        feed: 'WHO',
        code: API.KEYS.WHO_NEWS,
      },
    };
    const res = await axios.get(API.URL + API.RSS_FEED, config);
    feed = await rssParser.parseString(res.data);
  } catch (e) {
    console.error('Error loading WHO News', e);
    throw e;
  }
  if (feed) {
    const data = { data: feed.items, date: new Date().toString() };
    lsHelper.setItem(LS.CACHED_WHO_NEWS, data);
    return data;
  }
  return false;
};

const GetCDCNews = async () => {
  const rssParser = new RssParser();
  let cachedData = lsHelper.getItem(LS.CACHED_CDC_NEWS);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData;
  }
  let feed;
  try {
    const config = {
      insecureHTTPParser: true,
      timeout: 5000,
      params: {
        feed: 'CDC',
        code: API.KEYS.WHO_NEWS,
      },
    };
    const res = await axios.get(API.URL + API.RSS_FEED, config);
    feed = await rssParser.parseString(res.data);
  } catch (e) {
    console.error(e);
    throw e;
  }
  if (feed) {
    const data = { data: feed.items, date: new Date().toString() };
    lsHelper.setItem(LS.CACHED_CDC_NEWS, data);
    return data;
  }
  return false;
};

const GetECDCNews = async () => {
  const rssParser = new RssParser();
  let cachedData = lsHelper.getItem(LS.CACHED_ECDC_NEWS);
  if (cachedData && differenceInHours(new Date(), cachedData.date) > APP.DATA_REFRESH_INTERVAL) {
    cachedData = null;
  }
  if (cachedData) {
    return cachedData;
  }
  let feed;
  try {
    const config = {
      insecureHTTPParser: true,
      timeout: 5000,
      params: {
        feed: 'ECDC',
        code: API.KEYS.WHO_NEWS,
      },
    };
    const res = await axios.get(API.URL + API.RSS_FEED, config);
    feed = await rssParser.parseString(res.data);
  } catch (e) {
    console.error(e);
    throw e;
  }
  if (feed) {
    const data = { data: feed.items, date: new Date().toString() };
    lsHelper.setItem(LS.CACHED_ECDC_NEWS, data);
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
  GetAllUSStates,
  GetWHONews,
  GetCDCNews,
  GetECDCNews,
};
