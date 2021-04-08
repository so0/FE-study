export function isString(target) {
  return typeof target === 'string';
}
export function isFunction(target) {
  return typeof target === 'function';
}
export function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}
export function isHTMLElement(target) {
  return target instanceof HTMLElement;
}
