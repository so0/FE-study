# 고급 테크닉

> 고급 함수
> 쉽게 조작할 수 없는 객체
> 타이머 조작

### 고급 함수

##### 안전한 타입 탐지

자바스크립트 내장 타입 탐지 메커니즘 (`typeof` `instanceof`)은 완벽하지 않으며 혼란스러운 결과를 나타낼 때도 많음.

`Object.toString()` 메서드.

- Object 의 네이티브 `toString()` 메서드
- 어떤 값에서도 호출 가능하며, `"[object NativeConstructorName]" `형식의 문자열 반환

```js
function isArray(value) {
  return Object.prototype.toString.call(value) == "[object Array]";
}

function isFunction(value) {
  return Object.prototype.toString.call(value) == "[object Function]";
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) == "[object RegExp]";
}
```

그 외

```js
Object.prototype.toString.call(""); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(/test/i); // [object RegExp]
Object.prototype.toString.call(function () {}); // [object Function]
```

- 어느 객체든 정확히 식별 가능.

##### 스코프 확인 생성자 (Scope Safe Constructor)

- 생성자

  - 커스텀 객체를 정의, 단순히 `new 연산자`로 호출하는 함수.
  - 문제 : `new 연산자` 없이 생성자 호출 시 this가 전역객체 (`window`) 에 묶임.

- 스코프 확인 생성자
  - 실행에 앞서 this 가 정확한 타입의 인스턴스인지 확인하고 아니면 인스턴스를 생성하여 반환함.

```js
function Person(name, age, job) {
  if (this instanceof Person) {
    this.name = name;
    this.age = age;
    this.job = job;
  } else {
    return new Person(name, age, job);
  }
}

var person1 = Person("Nicholas", 29, "Software Engineer");
alert(window.name); //""
alert(person1.name); //"Nicholas"

var person2 = new Person("Shelby", 34, "Ergonomist");
alert(person2.name); //"Shelby"
```

- 실수로 **new** 를 쓰지 않더라도 객체를 올바르게 초기화 할 수 있음.
- 주의할 점

  - 생성자를 호출하는 컨텍스트가 그대로 잠김.
  - 상속이 깨질 수 있다.

  ```js
  function Polygon(sides) {
    if (this instanceof Polygon) {
      this.sides = sides;
      this.getArea = function () {
        return 0;
      };
    } else {
      return new Polygon(sides);
    }
  }

  function Rectangle(width, height) {
    Polygon.call(this, 2); // 반환값이 사용되지 않음.
    this.width = width;
    this.height = height;
    this.getArea = function () {
      return this.width * this.height;
    };
  }

  var rect = new Rectangle(5, 10);
  alert(rect.sides); //undefined
  ```

  ```js
  function Polygon(sides) {
    console.log("polygon this", this);
    if (this instanceof Polygon) {
      this.sides = sides;
      this.getArea = function () {
        return 0;
      };
      console.log("polygon this2", this);
    } else {
      return new Polygon(sides);
    }
  }

  function Rectangle(width, height) {
    Polygon.call(this, 2);
    // Rectangle의 인스턴스는 Polygon의 인스턴스이기도 하므로 Polygon.call은 의도대로 동작함.

    this.width = width;
    this.height = height;
    this.getArea = function () {
      return this.width * this.height;
    };
  }

  // 고쳐쓴 코드.
  Rectangle.prototype = new Polygon();

  var rect = new Rectangle(5, 10);
  console.log(rect.sides); //2
  ```

##### 지연 로딩 함수 (Lazy Loading)

```js
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    // 네이티브 XHR 확인
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") {
    // ActiveX 기반 XHR 확인
    if (typeof arguments.callee.activeXString != "string") {
      var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
        i,
        len;

      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (ex) {
          //skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    // 에러
    throw new Error("No XHR object available.");
  }
}
```

`createXHR() `함수

- 호출할 때마다 브라우저에서 어떤 기능을 지원하는지 확인.
- 네이티브 XHR 확인 -> ActiveX 기반 XHR 확인 -> 에러
- 함수를 호출할 때마다 불필요한 분기를 반복적으로 타게됨

**지연로딩**

> 함수에서 분기가 단 한번만 일어나도록 만드는 방법.

1. 함수를 처음 자기 자신을 수정하도록 만드는 방법.
   - 처음 호출할 때 자기 자신을 다른 함수로 덮어씀.

```js
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    createXHR = function () {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    createXHR = function () {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i,
          len;

        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
          } catch (ex) {
            //skip
          }
        }
      }

      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    createXHR = function () {
      throw new Error("No XHR object available.");
    };
  }
  return createXHR();
}

var xhr1 = createXHR();
var xhr2 = createXHR();
```

2. 적절한 함수를 선언하는 즉시 다른 함수를 할당하는 방법.
   - 코드를 처음 불러올 때만 부하가 걸림.

```js
var createXHR = (function () {
  if (typeof XMLHttpRequest != "undefined") {
    return function () {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    return function () {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i,
          len;

        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //skip
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    return function () {
      throw new Error("No XHR object available.");
    };
  }
})();

var xhr1 = createXHR();
var xhr2 = createXHR();
```

- 지연 로딩을 사용하면 분기가 필요한 코드에서 분기에 따른 성능 저하가 한번만 일어난다는 장점이 있음.
- 불필요한 코드의 중복 실행을 막음

##### 함수 바인딩

- 특정한 this 값과 특정한 매개변수를 넘기면서 다른 함수를 호출하는 함수.
- 콜백 및 이벤트 핸들러와 함께 사용하여 코드 실행 컨텍스트를 유지하면서 함수를 변수처럼 전달할 때 쓰임.

**bind()** 함수 : 함수를 특정한 컨텍스트에 묶는 함수.

- 함수와 컨텍스트를 매개변수로 받고 주어진 함수를 주어진 컨텍스트에서 다른 매개변수를 전달하며 호출하는 함수를 반환.

```js
function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  };
}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Function Binding Example</title>
  </head>
  <body>
    <input type="button" id="my-btn" value="Click Me" />
    <script type="text/javascript">
      function bind(fn, context) {
        return function () {
          return fn.apply(context, arguments);
        };
      }

      var handler = {
        message: "Event handled",

        handleClick: function (event) {
          console.log(this.message + ":" + event.type);
        },
      };

      var btn = document.getElementById("my-btn");
      btn.addEventListener("click", bind(handler.handleClick, handler));
    </script>
  </body>
</html>
```

- 함수 바인딩은 함수 포인터를 값으로 전달해야하고, 그 함수를 특정 컨텍스트에서 실행해야 할 때 유용함.
- 이벤트 핸들러 (바인딩 안할 경우 이벤트 타겟 요소), `setTimeout()`, `setInterval()`에 사용.

##### 함수 커링 (Function Currying)

- 커링은 매개변수 일부가 미리 지정된 함수를 생성.
- '**부분 함수 애플리케이션**'이라고 불리기도 함.
- 커링할 함수와 매개변수를 전달하여 생성함.

커링을 만드는 범용 함수

```js
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments),
      finalArgs = args.concat(innerArgs);
    return fn.apply(null, finalArgs);
  };
}
```

- `curry()` 함수의 주요 목적은 반환 함수의 매개변수를 적절한 순서로 정렬하는것.
  사용 방법

```js
function add(num1, num2) {
  return num1 + num2;
}

var curriedAdd = curry(add, 5);
console.log(curriedAdd(3));
```

- `add()` 의 첫번째 매개변수를 5로 고정한 커링 함수
- 8을 반환.

**커링 + 바인딩**

- context 객체를 함께 받음.

```js
function bind(fn, context) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments),
      finalArgs = args.concat(innerArgs);
    return fn.apply(context, finalArgs);
  };
}
```

- 함수 커링과 바인딩은 자바스크립트에서 강력한 동적 함수 생성을 가능하게 해줌.

### 쉽게 조작할 수 없는 객체

> 자바스크립트에서 무엇이든 공유하는 속성은 오랫동안 해결되지 않은 단점.
> 컨텍스트가 같을 때 객체 수정을 막을 방법이 없음.

- 쉽게 조작할 수 없는 객체를 만들어 해결.

##### 1 확장 불가능한 객체 (Non Extensible Object)

기본적으로 자바스크립트의 객체는 **확장 가능**. - 프로퍼티나 메서드 추가.
`Object.preventExtensions()`

- 객체에 새 프로퍼티나 메서드 추가 불가능
- `Object.isExtensible()`

##### 2 봉인된 객체 (Sealed Object)

`Object.seal()`

- `[[Configurable]]` 속성이 `false`로 지정됨.
  - (프로퍼티가 delete를 통해 삭제하거나, 프로퍼티 속성을 바꾸거나 접근자 프로퍼티로 변환할 수 있음을 나타냄.)
- 프로퍼티 값은 변경 가능.
- `Object.isSealed()`

##### 3 동결된 객체 (Frozen Object)

동결된 객체는 봉인 + `[[Writable]]` 속성이 `false`로 지정됨.

- 확장 불가 + 봉인 + 프로퍼티 값 변경 불가.
  `Object.freeze()`
- `Object.isFrozon()`

- 금지된 조작은 무시되고, 스트릭트 모드에서는 에러가 발생.

### 고급 타이머

`setTimeout()` , `setInterval()`

> 자바스크립트는 단일 스레드 환경에서 동작하며, 자바스크립트 타이머는 단순히 코드를 나중에 실행하도록 미뤄두는 것.

주요 자바스크립트 실행 프로세스와 별도로 프로세스가 한가할 때 실행하도록 예약하는 큐가 존재함.
타이머는 지정된 시간 후 큐에 코드를 삽입하는 방식으로 동작.
코드를 큐에 추가해도 즉시 실행되는 것이 아니고 가능한 순간에 실행됨.

타이머는 코드가 실행될 시점이 아니라 **큐에 추가될 시점**을 지정하는 것임.

##### 타이머 반복

`setInterval()`

- 주기적으로 타이머 코드를 큐에 추가함.
- 타이머 코드의 실행이 끝나기 전에 큐에 코드르 다시 추가할 가능성이 있음
  - => 자바스크립트 엔진은 `setInterval` 로 타이머 코드를 큐에 추가하려면 타이머 코드의 다른 인스턴스가 큐에 존재하지 않을 때만 추가됨.

단점

- 실행 되지 않는 구간이 생길 수 있음.
- 타이머 코드 사이의 갭이 예상보다 작을 수 있음.

`setTimeout`를 재귀 호출 하는 방법으로 해결.

```js
setTimeout(function () {
  // 실제 코드
  setTimeout(arguments.callee, interval);
}, interval);
```

- 함수 실행이 끝날 때 마다 새 타이머를 생성
- 이전 타이머가 코드 실행을 마친 시점에서만 새 타이머 코드를 큐에 추가하여 `setInterval` 단점 막음.

##### 프로세스 관리

> 자바스크립트는 악의적인 프로그래머가 사용자 컴퓨터를 다운시킬 수 없도록 제한되어 있음.
>
> - 오래 실행되는 루프 , 함수 호출이 너무 깊이 중첩되었을 때

**배열 나누기 (chunking)**

- 타이머를 사용해 루프를 해체.
- 배열을 몇 개의 덩어리로 나누어 처리하는 방법.
- 처리할 일을 큐에 담고 다음에 할 일을 타이머로 예약

```js
var data = [12, 123, 1234, 453, 436, 23, 23, 5, 4123, 45, 346, 5634, 2234, 345, 342];

function chunk(array, process, context) {
  setTimeout(function () {
    var item = array.shift();
    process.call(context, item);

    if (array.length > 0) {
      setTimeout(arguments.callee, 100); // 같은 익명 함수 호출
    }
  }, 100);
}

function printValue(item) {
  var div = document.getElementById("myDiv");
  div.innerHTML += item + "<br>";
}

chunk(data, printValue);
```

- 배열을 할 일 목록으로 간주함.
- shift() 메서드로 다음 할 일을 가져와 함수에 넘겨 처리.

##### 함수 감속

> DOM 조작은 다른 작업에 비해 메모리와 CPU 시간을 많이 요구함.
> ex ) `onresize` 이벤트 핸들러에서 DOM 조작 시 계산을 너무 많이함., 브라우저 멈출 수 있음.

타이머를 이용한 **함수 감속**으로 완화.
함수 감속은 코드가 쉼 없이 반복 실행되지 않도록 막음.

<!-- throttle : 이벤트를 일정한 주기마다 발생하도록 하는 기술, 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것.
1ms 설정 시 : 해당 이벤트는 1ms 동안 최대 한번만 발생.
스크롤, 리사이징 이벤트에 주로 사용
debounce : 이벤트를 그룹화 하여 특정 시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술.
아무리 많은 이벤트가 발생해도 모두 무시하고 특정 시간 사이에 어떤 이벤트가 발생하지 않았을 때 마지막 이벤트를 발생시킴. 연이어 호출되는 함수들 중 마지막 함수만 호출하도록 하는 것.
검색 .. 경험상 200ms ~ 400ms -->

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Throttling Example</title>
  </head>
  <body>
    <div id="myDiv" style="background:red;"></div>

    <script type="text/javascript">
      function throttle(method, scope) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
          method.call(scope);
        }, 100);
      }

      function resizeDiv() {
        var div = document.getElementById("myDiv");
        div.style.height = div.offsetWidth + "px";
      }

      window.onresize = function () {
        throttle(resizeDiv);
      };
    </script>
  </body>
</html>
```

- 함수를 처음 호출할 때 타이머를 생성하여 일정한 시간 뒤에 코드를 실행
- 함수를 두번째 호출하면 이전 타이머를 제거하고 다른 타이머를 생성.
- 이전 타이머가 이미 실행되었으면 연속 실행되지 않고, 이전 타이머가 아직 실행되지 않았다면 새로운 타이머로 교체됨.
- 목표 : 함수 실행 사이에 일정한 갭을 두는 것.

- 코드를 주기적으로 실행해야 하지만 호출 자체를 제어할 수 없을 때 감속 패턴 사용.

### 커스텀 이벤트

> 이벤트는 '옵저버'라는 디자인 패턴의 일종.
> **객체**가 자신에게 어떤 의미가 있는 일이 일어났음을 나타나는 이벤트를 생성.
> **다른 객체**는 이 객체를 관찰하고 있다 이벤트에 응답하여 코드를 실행함.

`주체 subject` & `옵저버 observer`

- 주체는 이벤트가 일어났음을 알리고, 옵저버는 이들 이벤트를 주시하며 주체를 관찰하기만 함.
- 이 패턴의 핵심 개념은 주체가 옵저버에 대해 전혀 모른다는것.
- 주체는 옵저버가 존재하던 말던 자신의 역할을 수행.
- 옵저버는 주체에 대해 알고 있으며 주체의 이벤트에 콜백(이벤트 핸들러)를 등록함.

ex) DOM 요소가 주체, 이벤트 처리 코드가 옵저버임.

커스텀 이벤트 : 이벤트를 관리하는 객체를 만들고, 다른 객체가 그 이벤트를 주시하게 하는 것.

```js
function EventTarget() {
  this.handlers = {};
}

EventTarget.prototype = {
  constructor: EventTarget,

  addHandler: function (type, handler) {
    if (typeof this.handlers[type] == "undefined") {
      this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
  },

  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (this.handlers[event.type] instanceof Array) {
      var handlers = this.handlers[event.type];
      for (var i = 0, len = handlers.length; i < len; i++) {
        handlers[i](event);
      }
    }
  },

  removeHandler: function (type, handler) {
    if (this.handlers[type] instanceof Array) {
      var handlers = this.handlers[type];
      for (var i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i] === handler) {
          break;
        }
      }

      handlers.splice(i, 1);
    }
  },
};
```

- `handler` 프로퍼티 : 이벤트 핸들러 저장
- `addHandler()` :이벤트 핸들러 등록 메서드
- `fire()` : 이벤트 일으키는 메서드, 매개변수 객체에 type 프로퍼티 필요.
- `removeHandler()` : 이벤트 핸들러 제거 메서드

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event Target Example</title>
    <script type="text/javascript" src="EventTarget.js"></script>
  </head>
  <body>
    <div id="myDiv" style="background: red"></div>

    <script type="text/javascript">
      function handleMessage(event) {
        console.log("Message received: " + event.message);
      }

      var target = new EventTarget();

      target.addHandler("message", handleMessage);

      target.fire({ type: "message", message: "Hello world!" });

      target.removeHandler("message", handleMessage);

      target.fire({ type: "message", message: "Hello world!" });
    </script>
  </body>
</html>
```

- 이벤트를 처리할 `handleMessage() `함수 정의.

### 드래그 앤 드롭 Drag And Drop

> 요소의 절대 위치를 지정하고 마우스로 움직일 수 있게 함.
> 드래그 앤 드롭을 구현하려면 이 기능을 정확한 시간에 등록(마우스 버튼을 누를 때) 하고 제거 (마우스 버튼을 놓을 때)

`onmousemove` 이벤트 핸들러를 이용해 주어진 요소를 항상 커서 위치에 표시

- 요소의 좌표를 `clientX`, `clientY` 프로퍼티로 설정.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Drag and Drop Example</title>
  </head>
  <body>
    <div id="myDiv" style="background: red; width: 100px; height: 100px; position: absolute"></div>
    <script type="text/javascript">
      // EventUtil.addHandler(document, "mousemove", function(event){
      document.addEventListener("mousemove", function (event) {
        var myDiv = document.getElementById("myDiv");
        myDiv.style.left = event.clientX + "px";
        myDiv.style.top = event.clientY + "px";
      });
    </script>
  </body>
</html>
```

위 기능을 마우스 버튼을 누를 때 등록 , 마우스 버튼을 놓을 때 제거 : 드래그 앤 드롭

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Drag and Drop Example</title>
  </head>
  <body>
    <div id="myDiv1" class="draggable" style="background: red; width: 100px; height: 100px; position: absolute"></div>
    <div id="myDiv2" class="draggable" style="background: blue; width: 100px; height: 100px; position: absolute; left: 100px"></div>
    <script type="text/javascript">
      var DragDrop = (function () {
        var dragging = null;

        function handleEvent(event) {
          //get event and target
          var target = event.target;

          //determine the type of event
          switch (event.type) {
            case "mousedown":
              if (target.className.indexOf("draggable") > -1) {
                dragging = target;
              }
              break;

            case "mousemove":
              if (dragging !== null) {
                //assign location
                dragging.style.left = event.clientX + "px";
                dragging.style.top = event.clientY + "px";
              }
              break;

            case "mouseup":
              dragging = null;
              break;
          }
        }

        //public interface
        return {
          enable: function () {
            document.addEventListener("mousedown", handleEvent);
            document.addEventListener("mousemove", handleEvent);
            document.addEventListener("mouseup", handleEvent);
          },

          disable: function () {
            document.addEventListener("mousedown", handleEvent);
            document.addEventListener("mousemove", handleEvent);
            document.addEventListener("mouseup", handleEvent);
          },
        };
      })();

      DragDrop.enable();
    </script>
  </body>
</html>
```

##### 드래그 기능 수정

마우스 위치 개선
`offsetLeft` , `offsetTop `프로퍼티 이용, `diffX` (clientX 와 offsetX 차이), `diffY` 롤 위치 보정.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Drag and Drop Example</title>
    <script type="text/javascript" src="EventUtil.js"></script>
  </head>
  <body>
    <div id="myDiv1" class="draggable" style="background: red; width: 100px; height: 100px; position: absolute"></div>
    <div id="myDiv2" class="draggable" style="background: blue; width: 100px; height: 100px; position: absolute; left: 100px"></div>
    <script type="text/javascript">
      var DragDrop = (function () {
        var dragging = null,
          diffX = 0,
          diffY = 0;

        function handleEvent(event) {
          //get event and target
          event = EventUtil.getEvent(event);
          var target = EventUtil.getTarget(event);

          //determine the type of event
          switch (event.type) {
            case "mousedown":
              if (target.className.indexOf("draggable") > -1) {
                dragging = target;
                // 요소 위치와 커서 위치의 차이 저장
                diffX = event.clientX - target.offsetLeft;
                diffY = event.clientY - target.offsetTop;
              }
              break;

            case "mousemove":
              if (dragging !== null) {
                // diff를 사용해 보정한 위치 할당
                dragging.style.left = event.clientX - diffX + "px";
                dragging.style.top = event.clientY - diffY + "px";
              }
              break;

            case "mouseup":
              dragging = null;
              break;
          }
        }

        //public interface
        return {
          enable: function () {
            document.addEventListener("mousedown", handleEvent);
            document.addEventListener("mousemove", handleEvent);
            document.addEventListener("mouseup", handleEvent);
          },

          disable: function () {
            document.addEventListener("mousedown", handleEvent);
            document.addEventListener("mousemove", handleEvent);
            document.addEventListener("mouseup", handleEvent);
          },
        };
      })();

      DragDrop.enable();
    </script>
  </body>
</html>
```

##### 커스텀 이벤트 추가

**드래그가 일어나는 시점**을 알지 못하면 애플리케이션에서 드래그 앤 드롭 기능을 제대로 사용 불가.
-> 커스텀 이벤트를 사용하여 드래그의 시작, 진행 중, 끝 시점을 파악

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Drag and Drop Example</title>
  </head>
  <body>
    <div id="status"></div>
    <div id="myDiv1" class="draggable" style="top: 100px; left: 0px; background: red; width: 100px; height: 100px; position: absolute"></div>
    <div id="myDiv2" class="draggable" style="background: blue; width: 100px; height: 100px; position: absolute; top: 100px; left: 100px"></div>
    <script type="text/javascript">
      function EventTarget() {
        this.handlers = {};
      }

      EventTarget.prototype = {
        constructor: EventTarget,

        addHandler: function (type, handler) {
          if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
          }

          this.handlers[type].push(handler);
        },

        fire: function (event) {
          if (!event.target) {
            event.target = this;
          }
          if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
              handlers[i](event);
            }
          }
        },

        removeHandler: function (type, handler) {
          if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
              if (handlers[i] === handler) {
                break;
              }
            }

            handlers.splice(i, 1);
          }
        },
      };

      var DragDrop = (function () {
        var dragdrop = new EventTarget(),
          dragging = null,
          diffX = 0,
          diffY = 0;

        function handleEvent(event) {
          //get event and target
          var target = event.target;

          //determine the type of event
          switch (event.type) {
            case "mousedown":
              if (target.className.indexOf("draggable") > -1) {
                dragging = target;
                diffX = event.clientX - target.offsetLeft;
                diffY = event.clientY - target.offsetTop;
                dragdrop.fire({ type: "dragstart", target: dragging, x: event.clientX, y: event.clientY });
              }
              break;

            case "mousemove":
              if (dragging !== null) {
                //assign location
                dragging.style.left = event.clientX - diffX + "px";
                dragging.style.top = event.clientY - diffY + "px";

                //fire custom event
                dragdrop.fire({ type: "drag", target: dragging, x: event.clientX, y: event.clientY });
              }
              break;

            case "mouseup":
              dragdrop.fire({ type: "dragend", target: dragging, x: event.clientX, y: event.clientY });
              dragging = null;
              break;
          }
        }

        //public interface
        dragdrop.enable = function () {
          document.addEventListener("mousedown", handleEvent);
          document.addEventListener("mousemove", handleEvent);
          document.addEventListener("mouseup", handleEvent);
        };

        dragdrop.disable = function () {
          document.addEventListener("mousedown", handleEvent);
          document.addEventListener("mousemove", handleEvent);
          document.addEventListener("mouseup", handleEvent);
        };

        return dragdrop;
      })();

      DragDrop.enable();

      DragDrop.addHandler("dragstart", function (event) {
        var status = document.getElementById("status");
        status.innerHTML = "Started dragging " + event.target.id;
      });

      DragDrop.addHandler("drag", function (event) {
        var status = document.getElementById("status");
        status.innerHTML += "<br>Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
      });

      DragDrop.addHandler("dragend", function (event) {
        var status = document.getElementById("status");
        status.innerHTML += "<br>Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
      });
    </script>
  </body>
</html>
```

- EventTarget 객체 생성 후 enable, disable 메서드 추가.
- **dragstart**, **drag**, **dragend** 커스텀 이벤트를 정의하여 추가.
- 드래그가 언제 일어나서 끝났는지 파악 가능.

### 요약

- 자바스크립트 함수는 일급 객체이며 강력하다.
  - 함수 컨텍스트 스위칭
  - 스코프 확인 생성자
  - 지연 로딩
  - 함수 바인딩
  - 함수 커링
- 쉽게 조작할 수 없는 객체
  - 확장 불가능한 객체
  - 봉인된 객체
  - 동결된 객체
- 타이머
  - setTimeout() , setInterval()
- 옵저버 패턴
- 드래그 앤 드롭
