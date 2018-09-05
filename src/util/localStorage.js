export const putJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getOrDefault = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value === null
    ? defaultValue
    : JSON.parse(value);
};

export const removeItem = (key) => {
  return localStorage.removeItem(key);
};
