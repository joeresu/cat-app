export const objToUrlParams = (obj, options = {}) => {
  if (options.encode === false) {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
  } else {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  }
};
