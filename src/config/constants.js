import stringConstants from './string.constants';
import { APP as APP_SETTINGS } from './settings';

const CONSTANTS = {
  APP: {
    NAME: 'COVID-19 Informer',
    ICON: 'AppIconDefault',
    COMPANY: 'Andy Amaya',
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
    SAMPLE: {
      PATH: `${APP_SETTINGS.WORKING_DIR}/sample`,
      NAME: 'Sample',
      ENABLED: false,
      SHOW_IN_MENU: true,
      SHOW_IN_NAV: true,
      ICON: 'BorderDot',
    },
    REPORTS: {
      PATH: '',
      NAME: 'Reports',
      ENABLED: false,
      SHOW_IN_TOP_NAV: true,
      SHOW_IN_MENU: false,
      SHOW_IN_NAV: false,
      HIDE_IN_MOBILE: true,
      ICON: 'ReportDocument',
      SUB_ROUTES: [
        {
          PATH: 'http://www.c19i.org',
          NAME: 'c19i',
          ENABLED: true,
          SHOW_IN_MENU: false,
          SHOW_IN_NAV: true,
          ICON: 'ReportDocument',
        },
        {
          PATH: 'https://youtube.com',
          NAME: 'You Tube',
          ENABLED: true,
          SHOW_IN_MENU: false,
          SHOW_IN_NAV: true,
          ICON: 'MSNVideos',
        },
        {
          PATH: 'https://google.com',
          NAME: 'Google',
          ENABLED: true,
          SHOW_IN_MENU: false,
          SHOW_IN_NAV: true,
          ICON: 'Search',
        },
      ],
    },
  },
};

export const REGEX = {
  PASSWORD: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
  PHONE: '([0-9]{3})(-)([0-9]{3})(-)([0-9]{4})',
  EMAIL: "[a-zA-Z0-9]+(?:(\\.|_)[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\\.[a-zA-Z0-9]*\\.[a-zA-Z0-9]*\\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?",
};

export const { ROUTES } = CONSTANTS;
export const { APP } = CONSTANTS;

export const setRouteLabel = (route, label) => {
  const r = CONSTANTS.ROUTES[route];
  r.LABEL = label;
  CONSTANTS.ROUTES[route] = r;
};

// eslint-disable-next-line
document.getElementById('title').innerText = `c19i | ${CONSTANTS.APP.NAME}`;

export const STRINGS = { ...stringConstants };

export default {
  ...CONSTANTS,
  STRINGS,
};
