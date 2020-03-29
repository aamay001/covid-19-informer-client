import axios from 'axios';
import settings from '../config/settings';
import strings from '../config/string.constants';

const { ADDRESS_COMPONENTS } = strings;

const { API } = settings;
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
      key: API.KEYS.GEOLOCATE,
    },
  };
  const response = await axios.get(API.URL + API.GEOLOCATE, config);
  if (response.status === 202) {
    const locationData = {};
    response.data.forEach((ac) => {
      if (ac.types.includes(COUNTRY)) {
        locationData.country = ac.long_name;
      } else if (ac.types.includes(STATE)) {
        locationData.state = ac.long_name;
      } else if (ac.types.includes(COUNTY)) {
        locationData.county = ac.long_name;
      } else if (ac.types.includes(CITY)) {
        locationData.city = ac.long_name;
      }
    });
    return locationData;
  }
  return false;
};

export default {
  GetUserLocationDetail,
};
