/* eslint-disable no-console */
/* globals document */

export const titleCase = str =>
  str && str.toLowerCase()
    .split(' ')
    .map(word => word && word[0] && word.replace(word[0], word[0].toUpperCase()))
    .join(' ');

export const debounceMap = new Map();

export const debounce = (func, wait, immediate, key) => {
  if (immediate) {
    func();
    return;
  }
  const existing = debounceMap.get(key);
  if (existing) {
    clearTimeout(existing);
  }
  const timeout = setTimeout(func, wait);
  debounceMap.set(key, timeout);
};

export const unbounce = (key) => {
  const existing = debounceMap.get(key);
  if (existing) {
    clearTimeout(existing);
  }
  debounceMap.clear(key);
};

export const insert = (str, index, value) => str.substr(0, index) + value + str.substr(index);

export const getDisplayError = (error) => {
  if (!error) {
    return '';
  }
  let displayError = error ? error.message || error.Message || (typeof (error) === 'string' && error) : undefined;
  displayError = displayError || 'Unknown error.';
  return displayError;
};

const daysArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let hidden;
let visibilityChange;

// Opera 12.10 and Firefox 18 and later support
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

const OnVisibleActions = new Map();
const OnHiddenActions = new Map();

const handleVisibilityChange = () => {
  if (document[hidden]) {
    OnHiddenActions.forEach(action => action());
  } else {
    OnVisibleActions.forEach(action => action());
  }
};

// Handle page visibility change
document.addEventListener(visibilityChange, handleVisibilityChange, false);

export const pushOnVisibleAction = (key, action) => {
  OnVisibleActions.set(key, action);
};

export const popOnVisibleAction = (key) => {
  OnVisibleActions.delete(key);
};

export const pushOnHiddenAction = (key, action) => {
  OnHiddenActions.set(key, action);
};

export const popOnHiddenAction = (key) => {
  OnHiddenActions.delete(key);
};

export const scrollToTopId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

export const scrollToElementWithDelay = (id, delay) =>
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    const ele = document.getElementById(id);
    if (ele) {
      // eslint-disable-next-line no-undef
      window.scrollTo({
        top: ele.offsetTop - 80,
        left: ele.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, delay);

export const getGeolocatedLocationString = (loc) => {
  if (loc) {
    const {
      country,
      state,
      county,
      city,
    } = loc;
    return `${country
      ? `${country}, `
      : ''}${state
      ? `${state}, `
      : ''}${county || ''}${city
      ? `${(county && ', ') + city}`
      : ''}`;
  }
  return '';
};

export default {
  titleCase,
  debounce,
  unbounce,
  getDisplayError,
  daysArray,
  pushOnHiddenAction,
  pushOnVisibleAction,
  popOnHiddenAction,
  popOnVisibleAction,
  getGeolocatedLocationString,
};
