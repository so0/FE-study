
# CSS
### CSS(Cascading Style Sheets, 종속형 스타일 시트)
 - 브라우저에서 웹페이지의 외형을 결정하는 선언형 언어 
 - 브라우저는 선택한 요소에 CSS 스타일 선언을 적용해 화면에 적절히 표현합니다. 
 - 속성과 그 값으로 구성.
 - CSS는 HTML, JavaScript와 함께 웹의 3대 핵심 기술.

### CSS first steps
  - 선택자
    - CSS 언어에는 충돌시 더 강력한 선택자를 제어하는 ​​규칙이 있음
    - 캐스케이드 규칙
  - CSS 구성 요소
    1. 속성 : 수정하려는 스타일 기능을 나타내는 사람이 읽을 수있는 식별자
    2. 값 : 각 속성에 할당되는것. 속성 스타일을 지정하는 방법이다.
  - @rules
    - CSS @rules ( "at-rules"로 발음)
    - CSS가 수행해야하는 작업 또는 작동 방식에 대한 지침을 제공
    - ex) @import, @media
    ```css
    @import 'styles2.css'

    body {
        background-color: pink;
    }

    @media (min-width: 30em) {
        body {
           background-color: blue;
        }
    }
    ```

- CSS 작동 방식
- https://developer.mozilla.org/ko/docs/Learn/CSS/First_steps/How_CSS_works
  1. 브라우저가 HTML을 로드
  2. HTML을 DOM(Document Object Model)으로 변환
  3. 이미지 및 비디오와 같은 HTML에 연결된 리소스와 연결된 CSS를 가져옴.
  4. 브라우저는 가져온 CSS 를 구문 분석 후 선택자 유형별로 다른 규칙을 다른 "buckets" 으로 정렬
   - ex) 요소, class, ID 등 선택자를 기반으로 DOM 의 어느 노드에 어떤 규칙을 적용해야 하는지 결정
  5. 규칙을 적용하여 render tree 배치
  6. 페이지를 화면에 그림
   
  - DOM 정보
     - DOM 은 트리 구조를 가짐
     - 요소, 속성 및 텍스트는 트리 구조에서 DOM node가 됨. 
     - 노드는 다른 DOM 노드와의 관계에 의해 정의
     - 브라우저 DevTools로 DOM 탐색 시 DOM에 적용된 규칙을 볼 수 있다.
  - 브라우저에서 인식하지 못하는 CSS 를 발견 시?
    - 브라우저가 규칙을 구문 분석하고 이해하지 못하는 속성 이나 값을 발견하면, 이를 무시하고 다음 선언으로 넘어감.
    - 기능을 이해하지 못할 경우 오류가 발생하지 않음.

--- 
#### CSS building blocks
- Cascade and inheritance
  - 규칙 충돌
    - 계단식 (cascade)
      - 동일한 우선 순위를 갖는 두 규칙이 적용될 때, CSS 에서 마지막에 나오는 규칙이 사용됨.
    - 우선 순위 (Specificity)
      - 요소 선택자 < 클래스 선택자
      - 우선순위에는 점수가 있음.
    - 상속 (Inheritance)
      - 부모 요소에서 설정된 일부 CSS 속성 값은 자식 요소에 의해 상속
      - 요소에 `color` 및 `font-family` 를 설정하면, 다른 색상 및 글꼴 값을 직접 적용하지 않는 한, 해당 요소 내부의 모든 요소(자손)에 해당 색상 및 글꼴로 스타일이 지정됨
      - 너비 (위에서 언급 한 것처럼), 마진, 패딩 및 테두리 등은 상속되지 않음.
      - 상속 제어하기
        - `inherit` : 속성 값을 부모 요소의 속성 값과 동일하게 설정
        - `initial` : 브라우저의 기본 스타일 시트에서 해당 요소의 해당 속성에 설정된 값과 동일하게 설정
        - `unset` : 속성을 **natural** 값으로 재설정. 속성이 자연적으로 상속되면 `inherit` 된 것처럼 작동하고 그렇지 않으면 `initial` 처럼 작동
      - 모든 속성 값 재설정 
        - `all`
  
  ---

#### Cascade 이해하기
1. 소스 순서
  - 동일한 가중치를 갖는 규칙이 두 개 이상인 경우, CSS 에서 마지막에 오는 규칙이 우선이다.
2. 우선 순위
- 선택자의 우선 순위 측정 방법
  - 4개의 다른 값 (또는 구성 요소) 을 사용하여 측정.
  - **Thousands**: 선언이 **인라인 스타일**인 style 속성 안에 있으면, 열에서 1점을 얻습니다. 이러한 선언에는 선택자가 없으므로 그 우선 순위는 항상 1000 입니다.
  - **Hundreds**: 전체 선택자에 포함된 각 **ID 선택자**에 대해 이 열에서 1점을 얻습니다.
  - **Tens**: 이 선택란에서 전체 선택자 내에 포함된 각 **class 선택자**, **속성 선택자** 또는 **pseudo-class** 에 대해 이 열에서 1점을 얻습니다.
  - **Ones**: 이 항목에서 각 **요소 선택자** 또는 **전체 선택자 내에 포함된 pseudo-element** 에 대해 1점을 얻습니다.
3. Importance
   - `!important`
   - 모든 계산을 무효화하는 데 사용할 수 있는 특별한 CSS 
   - 반드시 필요한 경우가 아니면 사용하지 말기.

#### CSS selectors
  -  선택자 (selector) 
     - CSS 선택자는 CSS 규칙의 첫 부분.
     - 규칙 내의 CSS 속성값을 적용하기 위해 어떤 HTML 요소를 선택해야 하는지 브라우저에 알려주는 요소.
   - 선택자 유형
     - Type, class 및 ID 선택자
     - 속성 선택자
     - Pseudo-classes 및 pseudo-elements
     - 결합자

  -  Pseudo-classes 및 pseudo-elements
    - 의사 클래스 (Pseudo-classes)
      - **특정 상태**에있는 요소를 선택하는 선택기
      -  ex `a:hover { }` : 마우스 포인터에 의해 요소를 가리킬 때만 요소를 선택
     - 의사 요소  (Pseudo element)
       -  요소 자체가 아닌 요소의 특정 부분을 선택하는 pseudo-elements
       - `::pseudo-element-name`
         -  ex)`p::first-line { } ` : 요소 내부의 첫 번째 텍스트 라인을 선택
---
#### The box model
- 박스 유형
  - 박스 유형은 `block` 및 `inline` 같은 `display 속성` 값으로 정의
 - 블록 박스
   - 한 줄을 차지
   - width, height 속성 사용가능
   - ex) `<h1>`, `<p>`
 - 인라인 박스 
   - 새 줄로 개행 하지 않음.
   - width, height 속성 적용 불가능
   - ex) `<a> `, `<span>`, `<em>` 및 `<strong>`
 - CSS Box Model
   - 전체 CSS box model은 블록 박스에 적용되며, 인라인 박스는 박스 모델에 정의된 일부 동작만 사용
   - Box 구성
   ![BOX MODEL](../images/box-model.png)
     - content box: 콘텐츠가 표시되는 영역. width and height와 같은 속성을 사용해 크기 지정.
     - padding box: 패딩은 콘텐츠 주변 영역. padding와 관련 속성을 사용해 제어
     - border box: 콘텐츠와 패딩까지 포함. border와 관련 속성을 사용하여 제어
     - margin box: 여백은 가장 바깥 쪽 레이어로 콘텐츠와 패딩, 테두리를 둘러싸면서 당 박스와 다른 요소 사이 공백 역할.margin와 관련 속성을 사용하여 제어
---
### CSS 레이아웃

- Normal Flow
  - 페이지 레이아웃을 전혀 제어하지 않을 경우 브라우저가 기본값으로 HTML 페이지를 배치하는 방법.
- CSS에서 요소 배치 방식
  - display 속성 
    - `block`, `inline` 또는 `inline-block`과 같은 기준 속성값은 보통 흐름(normal flow)속에서 요소가 동작하는 방식을 변경 가능.
  - Floats 
    - `float 속성`의 값을 예로 left로 적용하면 흔히 메거진 레이아웃에 속한 이미지가 텍스트를 자신의 주변에 떠있게 하는 방식.
      - `left` — 요소를 왼쪽에 띄움
      - `right` — 요소를 오른쪽에 띄움
      - `none` — 부동 여부를 지정하지 않음. 기본값.
      - `inherit` — 부동 속성의 값이 요소의 부모 요소에서 상속됌.
  - position 속성
    - box 내부에서 정확한 위치를 제어. 
    - `static`
    - `relative`
    - `fixed`
    - `absolute`
  - 테이블 레이아웃 
    - HTML 테이블 스타일을 지정하기 위한 기능이지만 display: table와 관련 속성을 사용하여 비테이블 요소에서도 사용 가능.
  - 다단 레이아웃 
    - 다단 레이아웃 속성은 신문에서 볼 수 있듯이 블록 콘텐츠를 단 형태로 배치되도록 만들 수 있음.


#### CSS값과 단위
- 절대 길이 단위
  - 항상 동일한 크기로 간주.
  - cm, ,cm, pt, px, in 등
- 상대 길이 단위
  - 상대 길이 단위는 다른 요소 (상위 요소의 글꼴 크기 또는 viewport 크기) 와 관련됨. 
  - 상대 단위를 사용하면 텍스트나 다른 요소의 크기가 페이지의 다른 모든 것에 비례하여 조정되도록 할 수 ㅅ있음.
  - em 과 rem 은 박스에서 텍스트로 크기를 조정할 때 가장 자주 발생하는 두 개의 상대 길이.
    - `rem`
      - 루트 요소의 글꼴 크기
    - `em`
      - 요소의 글꼴 크기. em 단위는 "부모 요소의 글꼴 크기" 를 의미
  - `vw`, `vh`
    - viewport 너비/높이의 1%
