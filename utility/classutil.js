import * as typeUtil from './typeCheck.js';

export function defineClass(childClass, superClass) {
  if (!typeUtil.isObject(childClass)) {
    throw Error('childClass가 유효하지 않습니다.');
  }
  if (arguments.length > 1 && !typeUtil.isFunction(superClass)) {
    throw Error('superClass가 유효하지 않습니다.');
  }

  function ChildClass() {
    if (typeUtil.isFunction(childClass.init)) {
      if (superClass && typeUtil.isFunction(superClass.init)) {
        superClass.init.call(this);
      }
      childClass.init.call(this);
    }
  }

  if (superClass) {
    function Temp() {}
    Temp.prototype = superClass.prototype;
    ChildClass.prototype = new Temp();
    ChildClass.prototype.constructor = ChildClass;
  }
  for (let property in childClass) {
    const addMember = childClass[property];
    if (property === 'init') {
      ChildClass[property] = addMember;
    } else {
      ChildClass.prototype[property] = addMember;
    }
  }
  return ChildClass;
}
