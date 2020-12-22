# 함수 표현식
 1. 함수 선언문
    -  `function 키워드` + `함수 이름` () {}
    - 비 표준 프로퍼티인 name 프로퍼티 지원. (IE X)
        ```js
        function functionName(arg0, arg1, arg2) {
          // 함수 본문
        }
        console.log(function.name) // "functionName"
        ```
    - 함수 선언 끌어올림 (hoisting)
      ```js
      sayHi();
      function sayHi() {
        console.log('hi')
      }
      ```
1. 함수 표현식
      > - 표현식 (Expression) : 하나의 **값으로 평가**될 수 있는 문. 
      >  - 문 (Statement) - 하나 이상의 표현식과 키워드 조합으로 구성된 엔진에게 내리는 명령.
   - 일반적인 변수 할당과 비슷.
   - 다른 표현식과 마찬가지로 호출 전 할당해야함.
      ```js
      sayHi(); 
      var sayHi = function() {
        console.log('hi')
      }
      ```
     - 함수 표현식을 사용하여 함수를 다른 함수에서 반환할 수 있음.
     - 값처럼 쓰이는 함수.

### 7.1 재귀
- 재귀 함수 : 함수가 자기 자신을 호출하는 형태. 
  ```js
  function factorial(num){
      if (num <= 1){
          return 1;
      } else {
          return num * factorial(num-1);
      }
  }

  var anotherFactorial = factorial;
  factorial = null;
  console.log(anotherFactorial(4));  //error!
  ```
   - factorial 이 null이 되어, 원래 함수에 대한 참조가 끊어짐.
 - `arguments.callee` : 현재 실행 중인 함수를 가리키는 포인터
    ```js
    function factorial(num){
        if (num <= 1){
            return 1;
        } else {
            return num * arguments.callee(num-1);
        }
    }

    var anotherFactorial = factorial;
    factorial = null;
    console.log(anotherFactorial(4));  //24
    ```
   - 스트릭트 모드에서는 `arguments.callee`에 접근 불가능하며, 에러 발생.
- 이름 붙은 함수 표현식
  ```js
  var factorial = (function f(num){
      if (num <= 1){
          return 1;
      } else {
          return num * f(num-1);
      }
  });
  ```
   - 이름 붙은 함수 표현식 `f()`를 생성.
   - 스트릭트, 비 스트릭트 모드에서 모두 동작.
### 7.2 클로저 (Closure)
 '**클로저**' : 다른 함수의 스코프에 있는 변수에 접근 가능한 함수.
-  클로저는 다른 함수안에서 정의된 함수이기 때문에 외부함수의 변수에 접근 가능.
-  클로저의 스코프 체인에는 자기 자신과 외부 함수, 전역 컨텍스트의 변수 객체가 담김.
 - 함수가 실행을 마치면 함수의 스코프, 변수 객체가 파괴됨. 
 - 외부 함수가 실행을 마쳤는데도 활성화 객체가 파괴되지 않음. -> 클로저에서 이를 참조하기 때문. 
 - 함수가 클로저를 반환했다면 해당 함수는 클로저가 존재하는 동안에 메모리에 계속 존재함.

 ##### 7.2.1 클로저와 변수
  - 클로저는 항상 외부함수의 변수에 마지막으로 저장된 값만 알 수 있음. - 클로저가 특정 시점의 변수를 저장하는 것이 아니라 변수 객체에 대한 참조를 저장하기 때문.
  ```js
  function createFunctions(){
      var result = new Array();
      
      for (var i=0; i < 10; i++){
          result[i] = function(){
              return i;
          };
      }

      return result;
  }

  var funcs = createFunctions();

  //every function outputs 10
  for (var i=0; i < funcs.length; i++){
    console.log(funcs[i]())
  }
  ```
  - 익명 함수에서 외부 함수 createFunctions의 변수 i를 참조.
  - createFunctions 가 실행을 마치면 변수 객체에서 i 값은 10 이므로.. 
```js
function createFunctions(){
    var result = new Array();
    
    for (var i=0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    
    return result;
}

var funcs = createFunctions();

//every function outputs 10
for (var i=0; i < funcs.length; i++){
  console.log(funcs[i]())
}
```
- 익명 함수를 정의하고 변수 i를 매개변수로 넘겨 즉시 호출함
- 각 함수는 고유한 num 값을 가지게 됨.
  
 ##### 7.2.2 this 객체
  - 전역 함수에서 this는 `window`, (스트릭트 모드 : `undefined`)
  - 메서드로 호출 시 this는 해당 객체.
  - 모든 함수는 호출 순간 자동으로 `this`, `arguments` 두 변수를 갖게됨. 
    ```js
      var name = "The Window";
      var object = {
          name : "My Object",
      
          getNameFunc : function(){
              return function(){
                  return this.name;
              };
          }
      };
      console.log(object.getNameFunc()());  //"The Window"
    ```
  - 내부함수는 외부함수의 this와 arguments에 직접 접근 불가.
    ```js
    var name = "The Window";
    
    var object = {
        name : "My Object",
    
        getNameFunc : function(){
            var that = this;
            return function(){
                return that.name;
            };
        }
    };
    
    console.log(object.getNameFunc()());  //"MyObject"
    ```
    - 외부함수의 this 객체를 다른 변수(`that`)에 저장하여 클로저가 외부함수의 this에 접근하도록 할 수 있음.
  
### 7.3 블록 스코프 흉내내기
  자바스크립트 블록 문장에서 정의한 변수는 해당 문장이 아니라 외부 함수에 묶임. 
 - 즉시 호출 함수
   - 익명 함수를 블록 스코프처럼 쓰는 문법, 고유 스코프 라고 부르기도 함.
      ```JS
      (function(){
        //코드 블록
      })();
      ```
   - 임시 변수가 필요할 때 사용. 
      ```js
      function outputNumbers(count){
        (function () {
            for (var i=0; i < count; i++){
                console.log(i);
            }
        })();
        console.log(i);   //causes an error
      }

      outputNumbers(5);
      ```
      - for 루프를 즉시 호출 함수로 감쌈. 
      - 익명함수 안에서 정의한 변수 i는 익명 함수가 실행을 마치는 즉시 파괴.
 - 전역 스코프에 추가되는 변수나 함수의 수를 제한하여 전역 스코프를 어지럽히지 않고 자유롭게 변수를 사용할 수 있음.
### 7.4 고유 변수 (Private variable)
 > 자바스크립트에는 고유 구성원<sup>private member</sup> 라는 개념이 없고 객체의 프로퍼티는 모두 공용<sup>public</sup>이다.
- 고유 변수<sup>private variable</sup> 
  - 함수 안에 정의한 변수는 함수 밖에서 접근이 불가능하므로 고유 변수로 간주.
  - 함수 `매개변수`, `지역변수`, `내부 함수` 등..
- 특권 <sup>privileged</sup>메서드
  - 고유 변수 / 함수에 접근 가능한 공용 메서드
##### 생성자 안에서 만드는 방법
  ```js
  function MyObject() {
    // 고유변수, 함수
    var privateVariable = 10;
    function privateFunction() {
      return false;
    }
    // 특권 메서드
    this.publicMethod = function() {
      privateVariable++;
      return privateFunction();
    }
  }
  ```
 - 생성자 안에서 모든 고유변수와 함수 정의 (`privateVariable`, `privateFunction`)
 - 고유 멤버에 접근 가능한 특권 메서드 생성 (`publicMethod`)
 - 특권 메서드가 클로저가 됨.
 - MyObject의 인스턴스를 생성하면 `privateVariable`, `privateFunction`에 직접적으로 접근할 수 없으며 반드시 `publicMethod`를 통해야함.
    ```js
    function Person(name){

      this.getName = function(){
          return name;
      };

      this.setName = function (value) {
          name = value;
      };
    }

    var person = new Person("Nicholas");
    console.log(person.getName());   //"Nicholas"
    person.setName("Greg");
    console.log(person.getName());   //"Greg"
    ```
    - `getName`, `setName` 은 고유변수 `name`에 접근 가능한 클로저.
    - 고유변수 `name`은 인스턴스마다 고유함.
  - 생성자 패턴은 메서드가 인스턴스마다 생성된다는 문제가 있음.
##### 7.4.1  정적 고유 변수
  - **생성자**와 메서드를 감싸는 **고유 스코프(즉시실행함수)** 를 통해서 만드는 패턴.
  - 생성자에는 var 키워드를 쓰지 않아 전역 변수로 만듬.
  - 고유 변수와 함수를 인스턴스에서 공유함.
  - 특권 메서드는 프로토타입에 정의하여 모든 인스턴스에서 같은 함수를 호출함.
    ```js
    (function(){
      // 고유 변수
      var name = "";
      
      // 생성자
      Person = function(value){    // 전역 변수     
          name = value;                
      };
      
      // 특권 메서드
      Person.prototype.getName = function(){
          return name;
      };
      
      Person.prototype.setName = function (value){
          name = value;
      };
    })();

    var person1 = new Person("Nicholas");
    console.log(person1.getName());  
    person1.setName("Greg");
    console.log(person1.getName()); 
                      
    var person2 = new Person("Michael");
    console.log(person1.getName());    
    console.log(person2.getName());   
    ```
     - `name` 변수는 모든 인스턴스에서 공유.
     - 인스턴스가 독립 변수를 가질 수는 없지만 특권 메서드를 프로토타입에 정의하여 재사용성이 좋아짐.

 ##### 7.4.2 모듈 패턴
  - 더글러스 크록포드가 고안한 패턴. 싱글톤과 같은 일을 함.
  - 싱글톤 : 인스턴스를 단 하나만 가지도록 의도한 객체
   - 자바스크립트에서 싱글톤을 만들 때 객체 표기법을 사용했음.
      ```js
      var singleton = {
        name: value,
        method: function() {
        }
      }
      ```
 - 기본 싱글톤을 확장하여 고유 변수와 특권 메서드를 사용함.
    ```js
    var singleton = function () {
      // 고유 변수와 함수
      var privateVariable = 10;
      function privateFunction() {
        return false;
      }
      // 특권/공용 메서드와 프로퍼티.
      return {
        publicProperty: true,
        publicMethod : function() {
          privateVariable++;
          return privateFunction();
        }
      }
    }();
    ```
  - 객체를 반환하는 익명함수 사용
  - 익명함수 내부 고유변수, 함수를 정의하고 공용 메서드, 프로퍼티를 가진 객체 리터럴을 반환함.
 ##### 7.4.3 모듈 확장 패턴
  - 모듈 패턴에서 객체를 반환하기 전에 **확장**하는 패턴.
  - 싱글톤 객체가 특정 타입의 인스턴스이고, 프로퍼티나 메서드를 추가하여 확장해야 할 때 유용하다.
    ```js
    var singleton = function () {
      // 고유 변수와 함수
      var privateVariable = 10;
      function privateFunction() {
        return false;
      }

      // 객체 생성
      var object = new CustomType(); 

      // 특권/공용 메서드와 프로퍼티 추가
      object.publicProperty = true;
      object.publicMethod = function() {
          privateVariable++;
          return privateFunction();
      };
      return object;
    }();
    ```
### 7.5 요약
 - 함수 표현식
   - 함수 선언문과 달리 이름이 필요하지 않음. (익명 함수)
   - 재귀 함수에서는 함수 이름 대신 `arguments.callee`를 사용하여 자기 자신을 호출.
 - 클로저
   - 다른 함수 안에서 정의된 함수로, 외부 함수의 변수에 접근 가능.
   - 함수가 클로저를 반환하면 해당 함수의 스코프는 클로저가 존재하는 동안 메모리에 계속 존재함.
     - 사용이 끝나면 null을 할당하여 참조를 제거하고, 메모리를 회수하도록 할 수 있음.
 - 즉시실행함수
   - 함수 생성 즉시 호출하여 내부 코드 실행, 참조는 남지 않음. 
   - 함수에 사용한 변수는 모두 파괴됨
- 고유 (private) 변수
  - 클로저를 사용하여 구현
  - 특권 메서드 :  고유 변수에 접근 가능한 메서드
  - 커스텀 타입
    - 생성자, 프로토타입 패턴
  - 싱글톤
    - 모듈, 확장 패턴
  - 클로저 과용 시 메모리 소비가 늘어날 수 있다.

##### 참고 사이트
- [자바스크립트의 스코프와 클로저](https://meetup.toast.com/posts/86)