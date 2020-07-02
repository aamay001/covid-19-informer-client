/**
 * @module settings
 * @description Contains all application configuration and settings. Some of the properties here
 * need to be set from the .env (environment) file. After modifying the environment file,
 * the application must be rebuilt to embed the valued.<br/><br/>
 * @name settings
 * @author Andy Amaya
 */

/**
 * @name DEFUALT
 * @description Object containint application default settings.
 * @property {object} API Object containing the default api endpoints.
 * @type {object}
 * @constant
 */
export const DEFAULT = {
  API: {
    URL: 'http://localhost:8080/',
  },
  APP: {
    ENVIRONMENT: 'DEVELOPMENT',
    URL: '/',
  },
};

const COVID_API_CONFIG = {
  VERSION_ROOT: process.env.REACT_APP_COVID_API_VERSION_ROOT || '/',
};

const { VERSION_ROOT } = COVID_API_CONFIG;

/**
 * @name SETTINGS
 * @type {object}
 * @description Object containing all of the application settings.
 * @property {object} API Object containing all of the API endpoints for this application.
 * @property {object} AUTH Object containing the settings used with the auth module.
 * @see {@link src/config/auth src/config/auth}
 * @constant
 *
*/
const SETTINGS = {
  API: {
    URL: process.env.REACT_APP_API_URL || DEFAULT.API.URL,
    GEOLOCATE: '/geolocate',
    RSS_FEED: '/rss',
    KEYS: {
      GEOLOCATE: process.env.REACT_APP_GEO_LOOKUP_API_KEY,
      WHO_NEWS: process.env.REACT_APP_WHO_NEWS_KEY,
    },
  },
  COVID_API: {
    URL: process.env.REACT_APP_COVID_API,
    COUNTRIES: `${VERSION_ROOT}/countries`,
    US_STATE_TOTALS: `${VERSION_ROOT}/states`,
    GLOBAL_TOTALS: `${VERSION_ROOT}/all`,
    COUNTRY: countryName => `${VERSION_ROOT}/countries/${countryName}`,
    COUNTRY_BY_ID: id => `${VERSION_ROOT}/countries/${id}`,
    COUNTRY_BY_iso2: iso2 => `${VERSION_ROOT}/countries/${iso2}`,
    JHU_CSSE: `${VERSION_ROOT}/jhucsse`,
    JHU_COUNTIES: `${VERSION_ROOT}/jhucsse/counties`,
    JHU_HISTORICAL: `${VERSION_ROOT}/historical`,
    JHU_HISTORICAL_BY_COUNTRY: country => `${VERSION_ROOT}/historical/${country}`,
    JHU_HISTORICAL_BY_PROVINCE: (country, province) => `${VERSION_ROOT}/historical/${country}/${province}`,
    JHU_HISTORICAL_ALL: `${VERSION_ROOT}/historical/all`,
  },
  ROLLBAR: {
    TOKEN: process.env.REACT_APP_ROLLBAR_TOKEN,
    ENV: process.env.REACT_APP_ROLLBAR_ENV,
  },
  ROUTES: {
    ANIMATION: 'fade right',
    ANIMATION_SPEED: 500,
  },
};

export const APP = {
  SITE_URL: process.env.PUBLIC_URL || '/',
  WORKING_DIR: process.env.REACT_APP_WORKING_DIR || '',
  DATA_REFRESH_INTERVAL: process.env.REACT_APP_DATA_REFRESH_INTERVAL || 8,
};

export const { AUTH } = SETTINGS;

export default {
  ...SETTINGS,
  APP,
};
