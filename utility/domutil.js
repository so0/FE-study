import * as typeUtil from './typeCheck.js';

export function on(target, eventType, handler) {
  if (typeUtil.isString(target)) {
    target = document.querySelector(target);
  }
  if (!typeUtil.isHTMLElement(target)) {
    throw Error('target은 string 또는 element 이어야합니다.');
  }
  if (!typeUtil.isString(eventType)) {
    throw Error('eventType은 string 이어야합니다.');
  }
  if (!typeUtil.isFunction(handler)) {
    throw Error('handler는 function 이어야합니다.');
  }

  target.addEventListener(eventType, handler);
}

export function off(target, eventType, handler) {
  if (typeUtil.isString(target)) {
    target = document.querySelector(target);
  }
  if (!typeUtil.isHTMLElement(target)) {
    throw Error('target은 string 또는 element 이어야합니다.');
  }
  if (!typeUtil.isString(eventType)) {
    throw Error('eventType은 string 이어야합니다.');
  }
  if (!typeUtil.isFunction(handler)) {
    throw Error('handler는 function 이어야합니다.');
  }

  target.removeEventListener(eventType, handler);
}
