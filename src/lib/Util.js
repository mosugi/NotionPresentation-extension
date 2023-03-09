export const setStyle = (selector, prop, value) => {
  const target = document.querySelector(selector);
  if (target) target.style[prop] = value;
};
