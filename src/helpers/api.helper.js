import axios from 'axios';
import settings from '../config/settings';
import strings from '../config/string.constants';

const { ADDRESS_COMPONENTS } = strings;

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
  const response = await axios.get(COVID_API.URL + COVID_API.COUNTRIES);
  if (response.status === 200) {
    return response.data;
  }
  return false;
};

const GetAllJHUData = async () => {
  const response = await axios.get(COVID_API.URL + COVID_API.JHU_CSSE);
  if (response.status === 200) {
    return response.data;
  }
  return false;
};

export default {
  GetUserLocationDetail,
  GetAllCountries,
  GetAllJHUData,
};
