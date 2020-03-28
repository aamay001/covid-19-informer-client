/* globals window */
/**
 * @module "localStorage.helper"
 * @description Local Storage helper module. This module is a simple
 * wrapper to the global localStorage API. The functions check for the availability
 * of local storage before calling the corresponding local storage api method.
 * <br/><br/>
 * @name "localStorage.helper"
 * @author Andy Amaya
 * @exports ls
 */

/**
 * @name setItem
 * @type {function}
 * @description Sets an item in local storage.
 * @param {string} key The identifier for item to store.
 * @param {any} item The item to store in local storage.
 */
const setItem = (key, item) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
};

/**
 * @name getItem
 * @type {function}
 * @param {string} key The identifier for a local storage item.
 * @description Returns an item from local storage that matches
 * the key provided.
 */
const getItem = (key, noParse) => {
  if (window.localStorage) {
    const i = noParse ?
      window.localStorage.getItem(key)
      : JSON.parse(window.localStorage.getItem(key));
    return i;
  }
  return undefined;
};

/**
 * @name clear
 * @type {function}
 * @description Clears the contents of local storage.
 */
const clear = () => {
  if (window.localStorage && window.localStorage.length > 0) {
    window.localStorage.clear();
  }
};

const logout = () => {
  if (window.localStorage && window.localStorage.length > 0) {
    Object.keys(window.localStorage).forEach((k) => {
      if (k.startsWith('adal')) {
        window.localStorage.removeItem(k);
      }
    });
  }
};

export default {
  setItem,
  getItem,
  clear,
  logout,
};
