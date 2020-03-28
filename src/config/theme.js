/* eslint-disable no-alert */
/* globals window  */
import { loadTheme, getTheme } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import ls from '../helpers/localStorage.helper';

export const toggleDarkMode = (value) => {
  ls.setItem('c19i-app-dark-mode', value);
  const restart = window.confirm('Application needs to be reloaded to toggle dark mode. Do it now?');
  if (restart) {
    window.location.reload();
  }
};

const darkModeState = ls.getItem('c19i-app-dark-mode');

const fonts = {
  small: {
    fontSize: '14px',
  },
  medium: {
    fontSize: '16px',
  },
  large: {
    fontSize: '19px',
    fontWeight: 'semibold',
  },
  xLarge: {
    fontSize: '21px',
    fontWeight: 'semibold',
  },
};

const darkTheme = {
  palette: {
    themePrimary: '#26a1ff',
    themeLighterAlt: '#02060a',
    themeLighter: '#061a29',
    themeLight: '#0b304d',
    themeTertiary: '#176199',
    themeSecondary: '#228ee0',
    themeDarkAlt: '#3caaff',
    themeDark: '#5ab8ff',
    themeDarker: '#86caff',
    neutralLighterAlt: '#2d2c2c',
    neutralLighter: '#020202',
    neutralLight: '#2a2929',
    neutralQuaternaryAlt: '#272626',
    neutralQuaternary: '#252525',
    neutralTertiaryAlt: '#242323',
    neutralTertiary: '#a9a9a9',
    neutralSecondary: '#8d8d8d',
    neutralPrimaryAlt: '#727272',
    neutralPrimary: '#fdfdfd',
    neutralDark: '#3a3a3a',
    black: '#fafcfc',
    white: '#2d2c2c',
    darkTheme: true,
  },
  fonts,
};

const standardTheme = {
  palette: {
    themePrimary: '#0075cf',
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e6f7',
    themeLight: '#a8d1f1',
    themeTertiary: '#5ba7e2',
    themeSecondary: '#1a84d5',
    themeDarkAlt: '#006aba',
    themeDark: '#00599d',
    themeDarker: '#004274',
    neutralLighterAlt: '#f6f6f6',
    neutralLighter: '#f2f2f2',
    neutralLight: '#e8e8e8',
    neutralQuaternaryAlt: '#d8d8d8',
    neutralQuaternary: '#cecece',
    neutralTertiaryAlt: '#c6c6c6',
    neutralTertiary: '#b8b7b7',
    neutralSecondary: '#a19f9f',
    neutralPrimaryAlt: '#8a8888',
    neutralPrimary: '#2d2c2c',
    neutralDark: '#5c5a5a',
    black: '#454444',
    white: '#fdfdfd',
  },
  fonts,
};

initializeIcons();
if (darkModeState) {
  loadTheme(darkTheme);
} else {
  loadTheme(standardTheme);
}

export {
  loadTheme,
  standardTheme,
  darkTheme,
  darkModeState,
};

export default getTheme();
