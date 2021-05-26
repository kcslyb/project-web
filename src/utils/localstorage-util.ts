const availableLocalStorage = () => {
  return localStorage || window.localStorage;
};
const addOrEditLocalStorage = (key: string, value: string) => {
  const storage = availableLocalStorage()
  if (storage) {
    storage.setItem(key, JSON.stringify(value));
  }
};
const getLocalStorage = (key?: string ) => {
  if (availableLocalStorage()) {
    const storage = availableLocalStorage()
    let item: any;
    if (key != null) {
      item = storage.getItem(key);
    }
    return JSON.parse(item);
  }
};
const removeLocalStorage = (key: string) => {
  if (availableLocalStorage()) {
    const storage = availableLocalStorage()
    storage.removeItem(key);
  }
};
const removeLocalStorageAll = () => {
  if (availableLocalStorage()) {
    const storage = availableLocalStorage()
    storage.clear();
  }
};
export {
  getLocalStorage,
  addOrEditLocalStorage,
  removeLocalStorage,
  removeLocalStorageAll
};
