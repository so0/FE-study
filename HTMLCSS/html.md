# HTML 

- HTML
  - HTML (Hypertext Markup Language,하이퍼텍스트 마크업 언어)
  - 웹페이지가 어떻게 구조화되어 있는지 브라우저로 하여금 알 수 있도록 하는 마크업 언어
  - 요소(elements)로 구성
- HTML Element
    - 여는 태그(Opening tag), 닫는 태그(Closing), 내용 (단순 텍스트) 으로 구성.
    - 블록 레벨 요소(Block level element)와 인라인 요소(Inline element) 
      - 블록 레벨 요소
        - 구조적 요소를 나타냄
        - 앞뒤 요소 사이 새로운 줄을 만듬
      - 인라인 요소
        - 항상 블록 레벨 요소 내 포함되어있음.
        - 단락 같은 큰 범위가 아닌 문장, 단어같은 작은 부분
        - 새로운 줄을 만들지 않음.
    - 빈 요소(Empty elements)
      - 단일 태그(Single Tag)를 사용하는 요소
      - ex) `<img src="" />`
  - 속성(Attributes)
    - 요소는 속성을 가질 수 있음. 
    - 화면에 표시되지 않는 추가적인 내용을 담고 싶을 때 사용

- HTML문서의 구조
``` html
<!DOCTYPE html>  
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <body>
    <p>This is my page</p>
  </body>
</html>
```
   - `<!DOCTYPE html>`: 문서 형식을 나타냅니다.  
   - `<html></html>`: `<html> `요소입니다. 전체 페이지의 콘텐츠를 포함하는 기본 요소.
   - `<head></head>`: 보이지 않지만 다양한 정보를 담는 요소.
   - `<meta charset="utf-8">` : HTML 문서의 문자 인코딩 설정을 UTF-8로 지정하는 것
    - `<title></title>`: 페이지 제목. 브라우저 탭에 표시되는 제목이자 북마크시에도 사용됨
    - `<body></body>:` <body> 웹 페이지에 표시되는 모든 콘텐츠를 포함하는 요소
---

- HTML에서 특수문자 표현
  - `<`	: `&lt;`
  - `>`	: `&gt;`
  - `"`: `&quot;`
  - `'`: `&apos;`
  - `&`	: `&amp;`

  
---

- HTML head란?
  - `<head>` 내용은 웹 페이지에 표시되지 않음.
  - head가 하는일 : 페이지에 대한 metadata를 포함함.
  - 홈페이지 이용자에게는 보이지 않지만 검색 결과에 노출 될 키워드, 홈페이지 설명, CSS 스타일, character set 등의 정보를 담음.

   - `<title>`
      - HTML문서 전체의 타이틀 표현

   - 메타데이터: `<meta>`요소
     - 메타데이터는 데이터를 설명하는 데이터
     - 많은 <meta> 요소가 name 과 content 속성을 가집니다:
       - name: 메타 요소 정보의 형태
       - content: 메타데이터의 컨텐츠
      - 인코딩 
        - `<meta charset="utf-8">`
      - 저자와 설명
        - `<meta name="author" content="Chris Mills">`
        - `<meta name="description" content="The MDN Learning Area aims to provide>`
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
  - HTML에 CSS 적용
      - `<link rel="stylesheet" href="my-css-file.css">`
  - HTML에 JS 적용
    - `<script src="my-js-file.js"></script>`
    - `<scrip>스크립트 내용</script>`
  - 문서의 기본 언어 설정
    - `<html lang="en-US">`

- HTML 텍스트
  - HTML은 브라우저가 텍스트를 올바르게 표시 할 수 있도록 텍스트 구조와 의미 (시멘틱(semantics)라고도 함. )를 제공함.
  - 시맨틱(Semantic)은 "의미의, 의미론적인"이라는 뜻
  - 시맨틱 요소
    - 제목
      - `<h1>` ~ `<h6>`
    - 단락
      - `<p>`
    - 리스트
      - `<ul>` ,`<ol>`, `<li>`
    - 중요와 강조 
      - `<em> `(emphasis) 요소
      - `<strong> `(strong importance) 요소
- 하이퍼링크 
  - 웹이 제공하는 혁신 중 하나.
  - 문서를 다른 문서와 연결하거나 다른 리소스와 연결해줌.
   ```html
   <a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
   ```

- 문서 기본 섹션 구조.
  - HTML은 ‘헤더’, ‘네비게이션 메뉴’, ‘주요 내용 컬럼’과  웹사이트의 영역을 정의하는데도 사용
  - header: `<header>`.
    - 제목과 로고, 웹페이지의 주요 정보 포함
  - navigation bar: `<nav>`.
    - 주로 메뉴, 링크, 탭.
  - main content: `<main>`
    - 웹 페이지에서 중심 컨텐츠
  - sidebar: `<aside>`
    - 사이드바. 주변 정보나 링크, 광고 등. 메인 컨텐츠에 의해 포함 내용이 달라짐
  - footer: `<footer>`.
    - 페이지 아래에 있는 부분. 저작권, 연락처 등 정보 포함
- HTML 디버깅
  - HTML은 문법 에러가 있어도 웹 페이지가 표시됨. 
    - 콘텐트를 게시하는 것이 문법을 확인하는 것보다 중요하기 때문
  - W3C의 Markup Validation Service 
    - HTML 유효성 검사 기능 제공
---
- HTML Form
  - 사용자와 웹사이트 또는 어플리케이션이 서로 상호 작용하는 기술.
  - HTML 폼은 하나 이상의 위젯으로 만들어짐.
  - Form 위젯
    - 텍스트 필드(한줄 또는 여러줄), 셀렉 박스,  버튼, 체크박스, 라디오 버튼 등.
    - 위젯을 설명하는 라벨과 함께 사용
  - input 요소
    - 사용자의 데이터를 받을 수 있는 요소.
    - type에 의해 동작 방식이 결정됨.
      - button, checkbox, date, email, file, radio, number 등.. 기본값은 `text`

  - input VS textarea 요소
    - input
      - 자동 닫힘 태그
      - 디폴트값을 value 속성으로 지정
      - `<input type="text" value="by default this element is filled with this text" />`
    - textarea
      - 닫는 태그 필요.
      - 디폴트값을 시작 태그와 끝 태그에 입력.
      - `<textarea>by default this element is filled with this text</textarea>`
  - button 요소 종류
    - submit
      - 데이터를 form 요소의 action 속성에 정의한 곳에 전송.
    - reset
      - 모든 폼 위젯을 기본 값으로 바꿈
    - button
      - 아무 동작 안함. javascript를 이용하여 사용자 버튼으로 사용.
