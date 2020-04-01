import stringConstants from './string.constants';
import { APP as APP_SETTINGS } from './settings';

const CONSTANTS = {
  APP: {
    NAME: 'COVID-19 Informer',
    ICON: 'AppIconDefault',
    COMPANY: '',
  },
  ENVIRONMENT: {
    TEST: 'TEST',
    DEVELOPMENT: 'DEVELOPMENT',
    PRODUCTION: 'PRODUCTION',
  },
  ROUTES: {
    HOME: {
      PATH: `${APP_SETTINGS.WORKING_DIR}/`,
      NAME: 'Home',
      ENABLED: true,
      SHOW_IN_MENU: true,
      SHOW_IN_NAV: true,
      ICON: 'Home',
    },
    WITH_SELECTION: {
      PATH: `${APP_SETTINGS.WORKING_DIR}/see/:location`,
      NAME: 'See',
      ENABLED: true,
      SHOW_IN_MENU: false,
      SHOW_IN_NAV: false,
      ICON: 'Home',
    },
  },
};

export const { ROUTES } = CONSTANTS;
export const { APP } = CONSTANTS;

export const setRouteLabel = (route, label) => {
  const r = CONSTANTS.ROUTES[route];
  r.LABEL = label;
  CONSTANTS.ROUTES[route] = r;
};

// eslint-disable-next-line
document.getElementById('title').innerText = `${CONSTANTS.APP.NAME}`;

export const STRINGS = { ...stringConstants };

export default {
  ...CONSTANTS,
  STRINGS,
};
