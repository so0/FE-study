# 이벤트2

### 13.4 이벤트 타입

[MDN 이벤트 참조](https://developer.mozilla.org/ko/docs/Web/Events)

> 웹 브라우저에서 발생하는 이벤트 종류는 많음. 200여가지..
> 이벤트 타입에 따라 이벤트 관련 정보가 다름.

##### DOM 레벨 3 이벤트 분류

- UI 이벤트
- Focus 이벤트
- 마우스 이벤트와 휠 이벤트
- 키보드와 텍스트 이벤트
- 조합 이벤트
- matation event
- HTML5 이벤트
- 장치 이벤트
- 터치와 제스처 이벤트

##### UI 이벤트

- `load` 이벤트

  - 이미지나 자바스크립트 파일, css 같은 외부 자원을 포함해 전체 페이지를 완전히 불러왔을 때 발생.

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Load Event Example</title>
    </head>
    <body>
      <p>Load event example.</p>
      <script type="text/javascript">
        window.addEventListener("load", function (event) {
          alert("Loaded!");
        });
      </script>
    </body>
  </html>
  ```

- `unload` 이벤트
  - `load` 이벤트와 반대로 문서를 닫을 때 발생.
  - 일반적으로 다른 페이지로 이동할 때 발생.
  - 참조를 제거하여 메모리 누수 방지 목적으로 사용.
- `resize` 이벤트
  - 브라우저 창의 높이나 너비를 바꿀 때 발생.
- `scroll` 이벤트
  - 스크롤바 있는 요소를 스크롤할 때 발생.

##### Focus 이벤트

- 요소가 포커스를 받거나 잃을 때 발생하는 이벤트.

  > - `document.hasFocus()`
  >   - 문서 내 포커스를 갖고 있는 요소가 있는지 판단, true, false 반환.
  > - `document.activeElement` 프로퍼티
  >   - 문서 내 포커스를 받은 요소 객체를 반환

- `blur` : 요소가 포커스를 잃을 때 발생, 버블링x
- `focus` : 요소가 포커스를 받을 때 발생, 버블링x
- `focusin` : 요소가 포커스를 받을 때 발생
- `focusout` : 요소가 포커스를 잃을 때 발생.

##### 마우스 이벤트와 휠 이벤트

- 마우스로 어떤 동작을 취할 때 발생하는 이벤트.
- 웹에서 가장 많이 쓰는 이벤트 그룹 중하나.
- 마우스 이벤트 종류

  - `click` : 마우스 버튼 클릭 or 엔터키 누를 때
  - `dbclick` : 더블클릭
  - `mousedown` : 마우스 버튼을 누를 때
  - `mouseup` : 마우스 버튼을 누르고 있다가 놓을 때
  - `mouseenter` : 마우스 커서가 요소 밖에서 안으로 처음 이동 시 (버블링 X)
  - `mouseleave` : 마우스 커서가 요소 위에서 밖으로 이동 시 (버블링 X)
  - `mousemove` : 마우스 커서가 움직일 때
  - `mouseout` : 마우스 커서가 요소 위에 있다 다른 요소 위로 이동 시
  - `mouseover` : 마우스 커서가 요소 바깥에서 요소 경계 안으로 이동할 때

- 마우스 위치
  ![mouseposition](../images/mouseposition.png)
  - 클라이언트 좌표
    - 뷰 포트 위치 기준 좌표
    - `clientX` / `clientY` 프로퍼티
  - 페이지 좌표
    - 페이지를 기준으로 한 마우스의 위치
    - `pageX` / `pageY` 프로퍼티
  - 화면 좌표
    - 전체 화면을 기준으로 한 마우스 위치.
    - `screenX` / `screenY` 프로퍼티
- 버튼 정보
  - `mousedown`, `mouseup` 이벤트는 event 객체에 어떤 버튼에서 이벤트가 발생했는지를 알려줌.
    - `0` : 마우스 기본 버튼(왼쪽)
    - `1` : 마우스 가운데 버튼(스크롤 휠)
    - `2` : 마우스 두번째 버튼(오른쪽)
- 키보드 수정
  - 마우스 이벤트는 마우스에서 일어나지만 키보드의 특정 키 상태가 영향을 끼치기도 함.
  - 키 상태를 나타내는 `shiftKey`, `ctrlKey`, `altKey`, `metaKey` 프로퍼티 제공.
  - 키를 누른 상태일때 `true`, 아닐 때 `ƒalse`

##### 키보드와 텍스트 이벤트

- 키보드 이벤트는 사용자가 키보드를 조작할 때 발생.

  - `keydown` : 키를 처음 누를 때 발생, 누르고 있는 동안 발생
  - `keypress` : 키를 누른 결과로 **문자**가 입력되었을 때 발생.
    - control, option, shift, tab, delete , 방향키 등 눌렀을 때는 발생하지 않음.
  - `keyup` : 키를 뗄 때 발생

- 키 코드
  - `keydown`, `keyup` 이벤트에서 `keyCode 프로퍼티` 제공.
  - 각 키에 대응하는 코드

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Keyboard Events Example</title>
  </head>
  <body>
    <input type="text" id="myText" />
    <script type="text/javascript">
      var textbox = document.getElementById("myText");
      textbox.addEventListener("keyup", function (event) {
        alert(event.keyCode);
      });
    </script>
  </body>
</html>
```

- 문자 코드
  - keypress 이벤트에서 `charCode 프로퍼티` 제공
  - 키 문자의 ASCII 코드가 들어있음.
  - `String.fromCharCode()` 메서드를 통해 실제 문자로 변경 가능.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Keypress Event Example</title>
  </head>
  <body>
    <input type="text" id="myText" />
    <script type="text/javascript">
      var textbox = document.getElementById("myText");
      textbox.addEventListener("keypress", function (event) {
        alert(event.charCode);
      });
    </script>
  </body>
</html>
```

- `textInput` 이벤트
  - DOM 레벨 3 이벤트 명세에서 편집 가능한 영역에 문자가 입력될 때 발생하는 이벤트 추가.
  - 문자에만 관심이 있으므로 event 객체의 `data 프로퍼티`에 삽입 문자 자체가 저장됨.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TextInput Event Example</title>
  </head>
  <body>
    <input type="text" id="myText" />
    <p>
      This example only works in browsers that support the
      <code>textInput</code> event.
    </p>
    <script type="text/javascript">
      var textbox = document.getElementById("myText");
      textbox.addEventListener("textInput", function (event) {
        alert(event.data);
      });
    </script>
  </body>
</html>
```

DOM 레벨 3 에서 바뀐점

- `key` 프로퍼티
  - `keyCode` 교체할 의도로 도입
  - 문자 키를 누르면 해당 문자 "k", "M"
  - 문자 키가 아닌 키를 누르면 해당 문자 "Shift", "Down"
- `char` 프로퍼티
  - 문자 키를 누르면 해당 문자 "k", "M"
  - 문자 키가 아닌 키를 누르면 `null`
- `location` 프로퍼티

  - 키를 어디에서 눌렀는지 나타내는 숫자값
  - 기본 키보드 : 0
  - 왼쪽 : 1 (왼쪽 Alt키)
  - 오른쪽 : 2 (오른쪽 Shift 키)
  - 키패드 : 3
  - 모바일 환경 가상 키보드 : 4
  - 조이스틱 : 5

- [keycode 참고 사이트](http://keycode.info/)

##### matation event

> DOM의 일부가 바꼈을 때 알리는 변경 이벤트.

- `DOMSubtreeModified` : DOM 구조가 바꼈을 때 발생.
- `DOMNodeInserted` : 노드가 다른 노드의 자식으로 삽입될 때 발생
- `DOMNodeRemoved` : 노드가 부모 노드로부터 제거될 때 발생.

- 노드 제거
  - `removeChild()`, `replaceChild()`
  - `event.relatedNode` 프로퍼티에 부모 노드에 대한 참조가 들어있음.
  - 제거된 노드에서 `DOMNodeRemoved` , 부모 노드에서 `DOMSubtreeModified` 이벤트 발생
- 노드 삽입
  - `appendChild()`, `replaceChild()` , `insertBefore()`
  - event.relatedNode 프로퍼티에 부모 노드에 대한 참조가 들어있음.
  - 삽입된 노드에서 `DOMNodeInserted` , 부모 노드에서 `DOMSubtreeModified` 이벤트 발생

##### HTML5 이벤트

- `beforeunload` 이벤트
  - window에서 발생하며 개발자에게 페이지에서 떠나지 못하게 막을 방법을 제공.
  - 이 이벤트를 통해 사용자에게 확인 메시지를 표시할 수 있음.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>BeforeUnload Event Example</title>
  </head>
  <body>
    <div id="myDiv">Try to navigate away from this page.</div>
    <script type="text/javascript">
      window.addEventListener("beforeunload", function (event) {
        var message = "I'm really going to miss you if you go.";
        event.returnValue = message;
        return message;
      });
    </script>
  </body>
</html>
```

- `DOMContentLoaded` 이벤트
  - `load` 이벤트는 외부 자원이 많이 포함된 페이지에서는 시간이 걸림.
  - `DOMContentLoaded` 이벤트는 DOM트리가 완전히 구성되는 즉시 발생.
  - 이미지, 자바스크립트 파일, CSS, 기타 자원을 기다리지 않음.
  - 항상 load 이벤트보다 먼저 발생함.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOMContentLoaded Event Example</title>
  </head>
  <body>
    <div id="myDiv">DOMContentLoaded example</div>
    <script type="text/javascript">
      window.addEventListener("DOMContentLoaded", function (event) {
        alert("DOMContentLoaded.");
      });
      window.addEventListener("load", function (event) {
        alert("load.");
      });
    </script>
  </body>
</html>
```

- `hashchange` 이벤트
  - html5 에서 도입.
  - URL 해시 (# 기호 뒷부분) 가 바뀔 때 발생하는 이벤트.
  - 반드시 window에 등록해야함.

### 13.5 메모리와 성능

> 이벤트 핸들러가 많을 수록 페이지 메모리를 많이 사용하고 페이지의 응답성이 떨어지므로 이벤트 핸들러 개수를 제한하는 것이 좋음.

#### 이벤트 위임

- 이벤트 버블링의 장점을 활용하여, 이벤트 핸들러를 하나만 할당해서 해당 타입의 이벤트를 모두 처리하는 테크닉.
- DOM 트리에서 가능한 가장 높은 요소에 이벤트 핸들러를 하나만 할당하는 방법.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event Delegation Example</title>
  </head>
  <body>
    <ul id="myLinks">
      <li id="goSomewhere">Go somewhere</li>
      <li id="doSomething">Do something</li>
      <li id="sayHi">Say hi</li>
    </ul>
    <script type="text/javascript">
      (function () {
        var list = document.getElementById("myLinks");

        list.addEventListener("click", function (event) {
          var target = event.target;

          switch (target.id) {
            case "doSomething":
              document.title = "I changed the document's title";
              break;

            case "goSomewhere":
              location.href = "http://www.wrox.com";
              break;

            case "sayHi":
              alert("hi");
              break;
          }
        });
      })();
    </script>
  </body>
</html>
```

- `onclick` 이벤트 핸들러를 `ul` 요소에만 할당함.
- 이벤트 위임을 적용하기 알맞은 이벤트
  - `click`, `mousedown`, `mouseup`, `keydown`, `keyup`, `keypress` 등.

#### 이벤트 핸들러 제거

- 더 이상 필요하지 않은 이벤트 핸들러(잔류 핸들러) 를 제거하는 방법.
- 잔류 핸들러는 웹 애플리케이션에서 메모리와 성능 문제를 일으킴.

1. 이벤트 핸들러를 제거하지 않은 채 요소만 문서에서 제거하는 경우.

- `removeChild()`, `replaceChild()`, `innerHTML` 로 페이지 일부를 교체하는 경우.
- 파괴된 요소에 할당되었던 이벤트 핸들러는 가비지 콜렉션 과정에서 제대로 회수되지 않을 수 있음.

```html
<body>
  <div id="myDiv">
    <input type="button" value="Send textInput to the textbox" id="myBtn" />
  </div>
  <script type="text/javascript">
    var btn = document.getElementById("myBtn");
    btn.onclick = function () {
      // 코드

      // 매우 나쁜 예
      document.getElementById("myDiv").innerHTML = "Processing...";
    };
  </script>
</body>
```

- 버튼의 이벤트 핸들러를 제거한 다음 div 요소의 `innerHTML` 을 덮어씀.

```html
<body>
  <div id="myDiv">
    <input type="button" value="Send textInput to the textbox" id="myBtn" />
  </div>
  <script type="text/javascript">
    var btn = document.getElementById("myBtn");
    btn.onclick = function () {
      // 코드

      // 잔류 핸들러 제거
      btn.onclick = null;

      document.getElementById("myDiv").innerHTML = "Processing...";
    };
  </script>
</body>
```

2. 페이지를 떠날 때
   - 페이지를 떠나기 전 제거하지 않은 이벤트 핸들러는 메모리에 계속 남음.
   - 페이지를 떠나기 전 `onunload` 이벤트 핸들러를 사용하여 이벤트를 제거하기.
     > "`onload` 에서 한 일은 반드시 `onunload` 에서 취소한다"

### 13.6 이벤트 시뮬레이션

> 자바스크립트로 이벤트를 발생 시킬 수 있음. 다른 이벤트와 마찬가지로 취급되며, 테스트 시 유용.

- DOM 이벤트 시뮬레이션

  1. 이벤트 객체 생성

  - `createEvent()`메서드 호출하여 이벤트 객체 생성
  - 생성할 이벤트 타입을 나타내는 문자열을 매개변수로 받음.
    - > 이벤트 타입 : UIEvents, MouseEvents, MutationEvents, HTMLEVents..

  2. event 객체 초기화

  - 각 타입의 이벤트 객체에는 적절한 데이터를 넘겨 초기화하는 메서드가 존재함.
    - `initMouseEvent()` / `initKeyboardEvent() `/ `initEvent()`

  3. 이벤트 발생

  - `dispatchEvent()`
  - 발생시킬 `event 객체`를 매개변수로 받음.

- 커스텀 DOM 이벤트
  - 개발자가 직접 이벤트를 생성할 수 있음.
  - `createEvent("CustomEvent")`
  - `initCustomEvent()`
    - type
    - bubbles
    - cancelable
    - detail
  - `dispatchEvent()`

### 13.7 요약

- 이벤트는 자바스크립트와 웹 페이지를 연결하는 우선적인 방식이다.
- 공통 이벤트는 대부분 DOM레벨 3 이벤트 명세나 HTML5에 정의되어있음.
- 메모리와 성능
  - 이벤트 핸들러가 많을 수록 메모리가 많이 사용, 핸들러 개수를 제한하는 것이 좋음
  - 이벤트 위임은 이벤트 버블링의 장점을 활용하여 이벤트 핸들러 숫자를 제한
  - 페이지 언로드 전 페이지 추가했던 이벤트 핸들러 제거하기.

##### 참고 링크

- [MDN 이벤트 참조](https://developer.mozilla.org/ko/docs/Web/Events)
- [이벤트](https://poiemaweb.com/js-event)
- [브라우저 이벤트 소개](https://ko.javascript.info/introduction-browser-events)
