// /*local storage*/
class Storage {
  constructor() {
    this.storage = window.localStorage;
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }

  get(key) {
    return this.storage.getItem(key);
  }

  removeStore(key) {
    this.storage.removeItem(key);
  }

  clearStore() {
    this.storage.clear();
  }
}

export default new Storage();