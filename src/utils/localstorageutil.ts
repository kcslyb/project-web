const availableLocalStorage = () => {
  return !!window.localStorage;
};
const addOrEditLocalStorage = (key: string, value: string) => {
  if (availableLocalStorage()) {
    let storage = window.localStorage;
    storage.setItem(key, JSON.stringify(value));
  }
};
const getLocalStorage = (key?: string ) => {
  if (availableLocalStorage()) {
    let storage = window.localStorage;
    let item: any;
    if (key != null) {
      item = storage.getItem(key);
    }
    return JSON.parse(item);
  }
};
const removeLocalStorage = (key: string) => {
  if (availableLocalStorage()) {
    let storage = window.localStorage;
    storage.removeItem(key);
  }
};
const removeLocalStorageAll = () => {
  if (availableLocalStorage()) {
    let storage = window.localStorage;
    storage.clear();
  }
};
export {
  getLocalStorage,
  addOrEditLocalStorage,
  removeLocalStorage,
  removeLocalStorageAll
};
