export const isIncludes = (target, arr) =>
  arr.some((el) => target.includes(el));
export const isNotIncludes = (target, arr) => !isIncludes(target, arr);
export const setStyle = (selector, prop, value) => {
  const target = document.querySelector(selector);
  if (target) target.style[prop] = value;
};

export const setSyncStorage = (obj) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set(obj, () => resolve());
  });
};

export const getSyncStorage = (key = null) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (item) => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
};
