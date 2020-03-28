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
};

export const { AUTH } = SETTINGS;

export default {
  ...SETTINGS,
  APP,
};
