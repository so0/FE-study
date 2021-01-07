# 브라우저 디버깅 도구

> 브라우저별 자바스크립트 디버깅 도구 종류 및 기능

## 크롬 개발자도구

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- 키보드 단축키 `Ctrl+Shift+I` (Windows)나 `Cmd+Opt+I` (Mac) 로 열기

#### Elements

- HTML 코드를 분석하고 실시간으로 수정할 수 있는 도구 패널이다.
- DOM과 CSS를 자유롭게 조작하여 사이트의 레이아웃과 디자인을 테스트 할 수 있다.
- HTML
  - DOM Tree 구조 확인 , DOM 노드 추가 삭제, 편집 등
- CSS

  - Style 직접 변경 - CSS 디버깅
  - `Computed` 탭에서 선택된 요소에 적용된 최종 스타일 확인

- 선택한 DOM 노드를 콘솔창에서 `$0` 로 참조 가능
- ![elements](/images/elements.png)
- ![device](/images/device.png)s

#### Console

- 가장 많이 쓰이는 기능. 로그를 확인하고 스크립트 명령어를 입력하는 패널.
- 다른 탭에서도 `ESC`키로 활성화 할 수 있음
- 브레이크 포인트 걸어놓은 상태에서 지역변수 값 확인, 표현식 확인

- 그 외 기능
  - 글로벌 변수로 저장 - 우클릭 store as global variable
    - temp1 에 저장됨.
  - `console.time`
  - ```js
    console.time("start");
    for (let i = 0; i < 10000; i++) {
      i = i * 1000;
    }
    console.timeEnd("start");
    ```
  - `console.group`
    ```js
    console.group();
    console.log(1);
    console.log(2);
    console.groupEnd();
    console.log(3);
    ```
- [console](https://developer.mozilla.org/ko/docs/Web/API/Console)

#### Source

- 소스 코드 확인 및 Javascript 디버깅
- **값 추적** (Watch)
  - 중단점에서 지정된 변수의 값을 출력
- **호출 스택** (Call Stack)
  - 현재 중단된 지점이 어떤 함수 호출을 통해 온 것인지 확인
- **스코프** (Scope)
  - 현재 스코프에 포함된 변수를 확인할 수 있다. 지역 변수와 전역 변수 외에도 현재 중단점의 클로저 변수도 확인 가능.
- **중단점** (Breakpoint)
  - 중단점의 목록 표시. 체크 박스를 해제하면 일시적으로 해당 중단점을 사용하지 않게 할 수 있다. 우클릭을 통해 컨텍스트 메뉴를 호출하여 모든 중단점을 지우거나 비활성화 시키는 등의 작업을 수행할 수 있다.
  - `XHR/fetch Breakpoints`
  - `DOM Breakpoints`

#### Network

- 페이지를 표시하는데 필요한 네트워크 작업에 대한 결과를 시간 순으로 표시
- 특정 항목을 선택하여 해당 항목이 어떻게 요청되었는지, 어떤 응답을 받았는지를 상세하게 확인

- `DOMContentLoaded` : DOM Tree 구조를 그리는데 걸리는 시간.
- `Load` : DOM Tree 구조를 포함, 이미지까지 화면에 로드되는 시간.
- Capture screenshot 옵션
  ![snapshot](/images/snapshot.png)
- Replay XHR
- ![replayxhr](/images/replayxhr.png)

- 트래픽 조절
  - 느린 네트워크 상황일 경우 테스트
- - ![network](/images/network.png)

#### Application (Resources)

- 현재 로딩된 웹 페이지에서 사용된 리소스를 볼 수 있는 패널
- Web Storage 확인
  - 세션, 로컬스토리지, 쿠키 등
    ![application](/images/application.png)

#### Performance (Timeline)

- 성능 측정
  ![performance](/images/performance.png)

  - [타임라인 도구 사용법 | Chrome DevTools | Google Developers](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=ko)

  - [개발자도구 - Performance편](https://tuhbm.github.io/2019/04/02/devTools-performance/)

#### Memory (Profiles)

- 메모리 사용 상태 를 볼 수 있고, 누수를 탐색할 수 있는 패널
- [메모리 문제 해결 | Chrome DevTools | Google Developers](https://developers.google.com/web/tools/chrome-devtools/memory-problems?hl=ko)
  ![memory](/images/memory.png)
  ![memory](/images/memory2.png)

#### Audits (LightHouse)

- 웹 에플리케이션의 성능을 향상시킬 수 있는 방법들을 컨설팅해주는 도구
- 페이지를 분석하고 최적화를 위한 팁 제공
  ![audit](/images/audit.png)
  ![audit](/images/audit2.png)
  - [개발자도구 - Audits편](https://tuhbm.github.io/2019/04/10/devTools-audits/)

## 그 외 브라우저

- 대부분 브라우저는 F12 를 통해 브라우저에서 개발자 도구를 열 수 있음.
- 크롬 개발자도구와 인터페이스는 거의 유사.

- Safari
  - [사파리](https://developer.apple.com/safari/tools/)
  - 환경설정 - 고급 패널에서 개발자용 메뉴 보기 체크로 활성화. -`Cmd + Opt + C`로 개발자 콘솔 여닫을 수 있음.
- Firefox
  - [파이퍼폭스 개발자도구 MDN](https://developer.mozilla.org/ko/docs/Tools)
  - 디벨로퍼 에디션도 따로 제공
    - [파이퍼폭스 developer edition](https://www.mozilla.org/ko/firefox/developer/)
- IE
  - [Using the F12 developer tools](<https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/bg182326(v=vs.85)?redirectedfrom=MSDN>)
  - [IE 개발자도구 참고용 블로그](http://www.egocube.pe.kr/lecture/content/html-javascript/201901010001)

---

## 모바일 디버깅

#### Chrome remote Debugging

- [Chrome DevTools에서 Device Mode로 휴대기기 시뮬레이션](https://developers.google.com/web/tools/chrome-devtools/remote-debugging?hl=ko)

#### Safari remote Debugging

- [How to Debug on iPhone Safari](https://www.browserstack.com/guide/how-to-debug-on-iphone)

###### 참고

[개발자 콘솔](https://ko.javascript.info/devtools#ref-521)
[디버깅](https://ui.toast.com/fe-guide/ko_DEBUG)
