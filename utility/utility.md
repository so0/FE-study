## DOM 이벤트 처리기

- DOM 이벤트 바인딩/언바인딩 기능을 제공한다.

```js
domutil.on('.class', 'click', function () {});
domutil.on(element, 'click', function () {});
domutil.off('.class', 'click', function () {});
domutil.off(element, 'click', function () {});
```

## 클래스 메서드 구현

```
util.defineClass({ 자식 클래스 객체 }, ?SuperClass);
```

- `init` 메서드가 존재하면 인스턴스를 생성할 때 호출되어야 한다.
- `init` 메서드안에서는 생성된 인스턴스를 `this`를 통해 접근 가능 하다.
- 상속과정에서 부모의 `init` 메서드에서 생성되는 객체맴버는 명시적으로 자식에서 `init` 을 실행해야 상속 된다.
- 상속과정에서 메서드는 오버라이딩이 가능하다.

```js
var Animal = util.defineClass({
  init: function () {},
  walk: function () {},
});
var Person = util.defineClass(
  {
    init: function () {},
    talk: function () {},
    // etc...
  },
  Animal
);

var p = new Person();
```
