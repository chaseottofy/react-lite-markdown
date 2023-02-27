/*local storage*/

const helper = {};
helper.setStorage = (key, value) => {
  window.localStorage.setItem(key, value);
}

helper.getStorage = key => window.localStorage.getItem(key);

helper.removeStorage = key => window.localStorage.removeItem(key);

export default helper;