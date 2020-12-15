# 6장 객체 지향 프로그래밍
 > 객체 프로퍼티의 이해
 > 객체의 이해와 생성
 > 상속의 이해 

 ##### 객체 지향 (Object Oriented:OO)언어
  : 클래스를 통해 같은 프로퍼티와 메서드를 가지는 객체를 여러개 만든다. 
  - ECMAScript 에서 객체
    - "프로퍼티의 순서 없는 컬렉션이며, 각 프로퍼티는 원시 값이나 객체, 함수를 포함한다" 라고 정의.
    - = 객체가 순서가 없는 값의 배열이다.
    - 해시 테이블이라고 생각.
    - 객체는 이름-값 쌍의 그룹이며, 각 값은 데이터나 함수가 될 수 있다.
    - 모든 객체는 참조 타입을 바탕으로 생성.
### 6.1 객체에 대한 이해
 - 객체 생성 방법 1 - Object 인스턴스 생성.
    ```js
    var person = new Object();
    person.name = "Nicholas";
    person.age = 29;
    person.job = "Software Engineer";
    person.sayName = function(){
    alert(this.name);
    };

    person.sayName();
    ```
 - 객체 생성 방법 2 - 객체 리터럴
    ```js
    var person = {
      name : "Nicholas",
      age : 29,
      job : "Software Engineer",
      sayName : function() {
        alert(this.name);
      }
    };
    ```
##### 6.1.1 프로퍼티 타입
    - 프로퍼티의 특징을 내부적으로만 유효한 속성에 따라 설명한다.
    - 자바스크립트 엔진 내부에서 구현하는 것으로 정의. 
    - 자바스크립트에서 직ㅂ접적으로 접근할 방법이 없음.
    - [[]] 속성 이름을 대괄호로 감싸 내부 속성임을 나타냄.
    - 데이터 프로퍼티
      - 데이터 값에 대한 단 하나의 위치를 포함하여 이 위치에서 값을 읽고 씀
      1. `[[Configuable]]` - 해당 프로퍼티가 delete를 통해 삭제하거나, 프로퍼티 속성을 바꾸거나 접근자 프로퍼티로 변환할 수 있음을 나타냄. 기본값 : `true`
      2. `[[Enumerable]]` - `for-in`루프에서 해당 프로퍼티를 반환함을 나타냄. 기본값 : `true`
      3. `[[Writable]]` - 프로퍼티의 값을 바꿀 수 있음을 나타냄. 기본값 : `true`
      4. `[[Value]]` - 프로퍼티의 실제 데이터 값을 포함한다. 프로퍼티의 값을 읽는 위치이며, 새로운 값을 쓰는 위치. 기본값 : `undefined`
```js
var person = {
  name: "Nicholas"
}
}
```
- Object.defineProperty() 메서드
  - 기본 프로퍼티 속성을 변경
  - 프로퍼티를 추가하거나 수정할 객체, 프로퍼티 이름, 서술자(descriptor)객체 세 가지를 매개변수로 받음.
  - 서술자 객체의 프로퍼티는 내부 속성 이름과 1:1로 대응한다.
```js
var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});

alert(person.name);
person.name = "Michael";
alert(person.name);
```
```js
var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
alert(person.name);
delete person.name;
alert(person.name);
```
```js
var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});

//throws error
Object.defineProperty(person, "name", {
    configurable: true,
    value: "Nicholas"
});
```
- Object.defineProperty() 호출 시 configuable, enumerable,writable의 값을 따로 명시하지 않는다면 기본 값은 `false`임. 

    - 접근자 프로퍼티
      - 데이터 값이 들어있지 않고, getter함수와 setter함수로 구성된다. (필수는 아님)
      - 접근자 프로퍼티를 읽을 때는 getter함수가 호출.
      - 접근자 프로퍼티에 쓰기 작업을 할 때는 새로운 값과 함께 함수를 호출하며 이 함수가 데이터를 어떻게 사용할 지 결정한다.
      - 접근자 프로퍼티 네 가지 속성
        1. `[[Configuable]]` - 해당 프로퍼티가 delete를 통해 삭제하거나, 프로퍼티 속성을 바꾸거나 접근자 프로퍼티로 변환할 수 있음을 나타냄. 기본값 : `true`
        2. `[[Enumerable]]` - `for-in`루프에서 해당 프로퍼티를 반환함을 나타냄. 기본값 : `true`
        3. `[[Get]]` - 프로퍼티를 읽을 때 호출할 함수. 기본값: `undefined`
        4. `[[Set]]` - 프로퍼티를 바꿀 때 호출할 함수. 기본값: `undefined`
      - 접근자 프로퍼티를 명시적으로 정의할 수는 없으며, Object.defineProperty()를 사용해야함. 
```js
var book = {
    _year: 2004,
    edition: 1
};
  
Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        
        }
    }
});

book.year = 2005;
alert(book.edition);   //2

```
 - `_year` 의 밑줄(_) 은 객체 외부에서 접근하지 않겠다는 의도를 나타낼 때 쓰는 표기법.
 - getter함수만 지정 시 해당 프로퍼티는 읽기 전용이 되고 수정하는 시도는 무시됨.
 - setter함수만 지정 시 프로퍼티를 읽으려 하면 에러 발생 

 es5 이전 비표준 메서드를 이용해 접근자 프로퍼티를 생성함 
 `__defineGetter__()`
 `__defineSetter__()`
```js
var book = {
    _year: 2004,
    edition: 1
};
  
//legacy accessor support
book.__defineGetter__("year", function(){
    return this._year;    
});

book.__defineSetter__("year", function(newValue){
    if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
    }    
});


book.year = 2005;
alert(book.edition);   //2
```


##### 6.1.2 다중 프로퍼티 정의
    - Object.defineProperties() 메서드
      - 객체에서 프로퍼티 여러 개를 동시에 수정
      - 매개변수는 프로퍼티를 추가하거나 수정할 객체 , 프로퍼티 이름이 추가 및 수정할 프로퍼티 이름과 대응하는 객체 두 가지.
```js

var book = {};

Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    
    edition: {
        value: 1
    },
    
    year: {            
        get: function(){
            return this._year;
        },
        
        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }                  
        }            
    }        
});
    
book.year = 2005;
alert(book.edition);   //2
```
  - book객체에 _year, edition 두 데이터 프로퍼티와, 접근자 프로퍼티 year생성.
##### 6.1.3 프로퍼티 속성 읽기
   - `Object.getOwnPropertyDescriptor()` 메서드
      - 원하는 프로퍼티의 서술자 프로퍼티를 읽을 수 있음.
      - 읽어올 프로퍼티가 포함된 객체, 서술자를 가져올 프로퍼티 이름 두 가지 매개변수를 받음.
      - 반환값 : 
        - 접근자 프로퍼티: configurable, enumerable, get, set 을 포함하는 객체
        - 데이터 프로퍼티 : configurable, writable, value 를 포함하는 객체 반환.
```js
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {            
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }                  
        }            
    }        
});
    
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
alert(descriptor.value);          //2004
alert(descriptor.configurable);   //false
alert(typeof descriptor.get);     //"undefined"

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(descriptor.value);          //undefined
alert(descriptor.enumerable);     //false
alert(typeof descriptor.get);     //"function"

```
### 6.2 객체 생성
 > 객체 생성 시, 같은 인터페이스를 가진 객체를 여러 개 만들 경우 중복 코드 발생.
###### 6.2.1 팩터리 패턴
    - 특정 객체를 생성하는 과정을 추상화 하는 것.
    - 클래스를 정의하는 방법이 없으므로 특정 인터페이스 객체를 생성하는 과정을 함수로 추상화.
```js
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };    
    return o;
}

var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");

person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"
```
###### 6.2.2 생성자 패턴
 > ESCMAScript의 생성자는 특정 타입의 객체를 만드는데 사용. 
 커프텀 생성자를 만들어 원하는 타입의 객체에 필요한 프로퍼티와 메서드를 직접 정의 가능.

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };    
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
 - 명시적으로 객체를 생성하지 않음
 - 프로퍼티와 메서드는 this객체에 직접적으로 할당.
 - return 문이 없음.
  
- 함수 Person의 이름 첫 글자가 대문자로 시작 
- 생성자는 항상 대문자로 시작하고 아닌 함수는 소문자로 시작하는 표기법.
- Person의 인스턴스 생성 시 new 연산자 사용.

1. 객체 생성
2. 생성자의 this값에 새 객체를 할당하면서 this가 새 객체를 가리킴
3. 생성자 내부 코드를 실행 (객체에 프로퍼티 추가)
4. 새 객체 반환.
```js
person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"

alert(person1 instanceof Object);  //true
alert(person1 instanceof Person);  //true
alert(person2 instanceof Object);  //true
alert(person2 instanceof Person);  //true

alert(person1.constructor == Person);  //true
alert(person2.constructor == Person);  //true

alert(person1.sayName == person2.sayName);  //false        
```
 - constructor 프로퍼티
   - 두 객체의 constructor 프로퍼티는 Person을 가리킴
   - 원래 객체의 타입을 파악하려는 의도. 
   - 타입을 알아내는 목적으로넌 instanceof연산자가 안전하다.

 - 함수로서의 생성자.
  > 생성자 함수와 다른 함수와의 차이는 어떻게 호출 하느냐
  > 생성자는 결국 함수이며, new 연산자와 함께 호출한 함수는 생성자처럼 동작.
  > new 없이 호출 시 일반 함수처럼 동작한다.
```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}

// 생성자로 사용
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName();   //"Nicholas"

// 함수로 호출
Person("Greg", 27, "Doctor");  //adds to window
window.sayName();   //"Greg"

// 다른 객체의 스코프에서 호출.
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();    //"Kristen"
```
 - 생성자의 문제점
  > 인스턴스마다 메서드가 생긴다
```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
// 우회 방법
function sayName(){
    alert(this.name);
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"

alert(person1 instanceof Object);  //true
alert(person1 instanceof Person);  //true
alert(person2 instanceof Object);  //true
alert(person2 instanceof Person);  //true

alert(person1.constructor == Person);  //true
alert(person2.constructor == Person);  //true

alert(person1.sayName == person2.sayName);  //true      
```
- 함수 정의를 생성자 밖으로 내보내면 우회 가능.
- 전역 스코프에서 정의된 sayName() 함수를 공유한다.
- 전역 스코프를 어지럽히는 단점.. 

###### 6.2.3 프로토타입 패턴
 > 모든 함수는 prototype 프로퍼티를 가짐.
 해당 참조 타입의 인스턴스가 가져야 할 프로퍼티와 메서드를 담고 있음.
 생성자를 호출할 때 생성되는 객체의 프로토타입이다.
 프로토타입의 프로퍼티와 메서드는 **객체 인스턴스 전체에서 공유**된다. - 장점
```js
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
person1.sayName();   //"Nicholas"

var person2 = new Person();
person2.sayName();   //"Nicholas"

alert(person1.sayName == person2.sayName);  //true
```
 - 생성자 함수는 비어 있지만, 생성자를 호출해 만든 객체에 프로퍼티와 메서드가 존재. 
 - 생성자 패턴과 달리 프로퍼티와 메서드를 모든 인스턴스로에서 공유하게됨.
- _프로토타입은 어떻게 동작하는가_
  - 모든 프로토타입은 자동으로 constructor프로퍼티를 가짐. 
    - constructor : g해당 프로토타입이 프로퍼티로서 소속된 함수.
    - Pesron.prototype.constuctor 는 Person.
    - 생성자를 호출해서 인스턴스를 생성할 때마다 인스턴스 내부에는 생성자의 프로토타입을 가리키는 포인터가 생성됨. 이 포인터는 `[[Prototype]]`. (내부 프로퍼티)
    - `[[Prototype]]` : `__proto__` 프로퍼티를 통해 접근.
    - 인스턴스와 직접 연결되는 것은 생성자의 프로토 타입이지 생성자 자체가 아니다.
    - 객체 사이에 프로토타입 연결이 존재하는지 isPrototypeOf() 메서드를 통해 알 수 있다. 
    - Object.getPrototypeOf()
      - `[[Prototype]]`의 값을 반환
  
  프로퍼티 검색 과정.  - 프로토타입 체인을 타고 올라가는 내용.
```js
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = "Greg";
alert(person1.name);   //"Greg" � from instance
alert(person2.name);   //"Nicholas" � from prototype

```
  - 객체 인스턴스에서 프로토타입에 있는 값을 읽을 수 있지만 수정 불가.
  - 프로토타입 프로퍼티와 같은 이름의 프로퍼티 추가 시 해당 프로퍼티는 인스턴스에 추가됨.
  - 인스턴스 프로퍼티가 프로토타입 프로퍼티를 '가린다'
```js
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = "Greg";
alert(person1.name);   //"Greg" � from instance
alert(person2.name);   //"Nicholas" � from prototype

delete person1.name;
alert(person1.name);   //"Nicholas" - from the prototype
```
  - 인스턴스 프로퍼티를 delete하면 다시 프로토타입의 프로퍼티에 접근 가능.

 - hasOwnProperty()
   - 프로퍼티가 인스턴스에 존재하는 지 확인하는 메서드.
   - Object로 부터 상속받은 메소드
   - 프로퍼티가 객체 인스턴스에 존재할 때만 true반환.
```js
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnProperty("name"));  //false
alert("name" in person1);  //true

person1.name = "Greg";
alert(person1.name);   //"Greg" � from instance
alert(person1.hasOwnProperty("name"));  //true
alert("name" in person1);  //true

alert(person2.name);   //"Nicholas" � from prototype
alert(person2.hasOwnProperty("name"));  //false
alert("name" in person2);  //true

delete person1.name;
alert(person1.name);   //"Nicholas" - from the prototype
alert(person1.hasOwnProperty("name"));  //false
alert("name" in person1);  //true
```

> Object.getOwnPropertyDescriptor() 는 인스턴스 프로퍼티에만 동작함.
- _프로토타입과 in 연산자_
 - in 연산자 
    - 주어진 이름의 프로퍼티를 객체에서 접근할 수 있을 때, 
    - 해당 프로퍼티가 인스턴스에 존재하든 프로토타입에 존재할 때 true 반환.

객체의 프로퍼티가 프로토타입에 존재하는지 는 
 in연산자와 hasOwnProperty 조합.
```js
   
function hasPrototypeProperty(object, name){
    return !object.hasOwnProperty(name) && (name in object);
}
    
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person = new Person();        
alert(hasPrototypeProperty(person, "name"));  //true

person.name = "Greg";
alert(hasPrototypeProperty(person, "name"));  //false        
```
- _프로토타입의 대체 문법_
  - 모든 프로퍼티와 메서드를 담은 객체 리터럴로 프로토타입을 덮어쓸 수 있음.
```js
function Person(){
}

Person.prototype = {
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

var friend = new Person();

alert(friend instanceof Object);  //true
alert(friend instanceof Person);  //true
alert(friend.constructor == Person);  //false
alert(friend.constructor == Object);  //true
```
 - constructor 프로퍼티가 Person을 가리키지 않음.. 
 - 네이티브 constructor 프로퍼티는 기본적으로 나열 불가능한 프로퍼티이다. 
 - Object.defineProperty()를 쓰는 것이 좋음.

- _프로토타입의 동적 성질_
  - 프로토타입에서 값을 찾는 작업은 런타임 검색임.
  - 프로토타입 값이 바뀌면 인스턴스에도 반영됨.
```js
function Person(){
}

var friend = new Person();
        
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

friend.sayName();   //error
```
  - `[[Prototype]]` 포인터
    - 생성자가 호출될 때 할당되므로, 프로토타입을 다른 객체ㅔ로 바꾸면 생성자와 원래 프로토타입 사이의 연결이 끊어짐.
    - 그림6-3
    - 생성자의 프로토타입 변경 시 그 이후 생성한 인스턴스는 새로운 프로토타입을 참조하지만, 그이전에 생성한 인스턴스는 바꾸기 전의 프로토타입을 참조한다.
- _네이티브 객체 프로토타입_
  - 네이티브 참조 타입도 프로토타입 패턴으로 구현되어있음.
  - Object, Array, String 등..
  - 네이티브 객체의 프로토타입을 통해 기본 메서드를 참조할 수 있고, 새 메서드도 정의 가능.
- _프로토타입의 문제점_
  - 공유 성질
    - 함수에는 이상적임.
    - 원시값의 경우 할당 시 prototype 프로퍼티를 가림
    - 프로퍼티가 참조값을 포함한 경우
      - 배열 수정 시 .. 문제 예시
  > 프로토타입 패턴을 있는 그대로만 사용하는 경우는 드뭄.
###### 6.2.4 **생성자 패턴과 프로토타입 패턴의 조합**
  - 가장 널리 쓰이는 방법.
  - 생성자 패턴으로 인스턴스 프로퍼티를 정의 후 프로토타입 패턴으로 메서드와 공유 프로퍼티를 정의.
    - 자신만의 인스턴스 프로퍼티를 가지고 메서드는 공유한다.
```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor: Person,
    sayName : function () {
        alert(this.name);
    }
};

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court"
alert(person1.friends === person2.friends);  //false
alert(person1.sayName === person2.sayName);  //true

```
###### 6.2.5 동적 프로토타입 패턴
 - 모든 정보를 생성자 내부에 캡슐화하고, 필요한 경우 프로토타입을 생성자 내부에서 초기화하여 생성자와 프로토타입을 모두 쓰는 장점을 취하는 접근법.
 - 
```js
function Person(name, age, job){

    //properties
    this.name = name;
    this.age = age;
    this.job = job;
    
    //methods
    if (typeof this.sayName != "function"){
    
        Person.prototype.sayName = function(){
            alert(this.name);
        };
        
    }
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```
###### 6.2.6 기생 생성자 패턴
 - 
```js
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };    
    return o;
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();  //"Nicholas"
```
 - Person 생성자가 새 객체 생성후 프로퍼티와 메서드를 초기화하여 반환.
 - new 연산자를 써서 함수를 생성자로 호출하는 점 외에 팩터리 패턴과 같음.
```js
function SpecialArray(){       

    //create the array
    var values = new Array();
    
    //add the values
    values.push.apply(values, arguments);
    
    //assign the method
    values.toPipedString = function(){
        return this.join("|");
    };
    
    //return it
    return values;        
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"

alert(colors instanceof SpecialArray);
```
 - 반환된 객체, 생성자, 생성자의 프로토타입 사이에 연결고리가 없음.
###### 6.2.7 방탄 생성자 패턴
 - 방탄 객체(durable)
   - 공용 프로퍼티가 없고 메서드가 this를 참조하지 않는 객체
   - this나 new의 사용을 금지하는 환경.
   - 기생 생성자 패턴과 비슷하지만
     - 생성된 객체의 인스턴스가 this를 참조하지 않음
     - 생성자를 new를 통해 호출하는 경우가 없음.
```js
function Person(name, age, job) {
  var o = new Object();

  o.sayName = function() {
    alert(name);
  }
  return 0;
}

var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```
### 6.3 상속
 객체 지향 언어
  - 인터페이스 상속 - 메서드 시그니처만 상속
  - 구현 상속 - 실제 메서드를 상속
 ECMAScript에는 함수 시그니처가 없으므로 인터페이스 상속 불가넝, 구현 상속만 지원. 
 상속은 프로토타입 체인을 통해 이루어짐
###### 6.3.1 프로토타입 체인
 프로토타입 개념을 이용해 두가지 참조 사이 프로퍼티와 메서드를 상속하는것. 
 - _기본 프로토타입_
 - _프로토타입과 인스턴스 사이의 관계_
 - _메서드_
 - _프로토타입 체인의 문제_
###### 6.3.2 생성자 훔치기
 - _매개변수 전달_
 - _생성자 훔치기 패턴의 문제_
###### 6.3.3 조합 상속

###### 6.3.4 프로토타입 상속

###### 6.3.5 기생 상속

###### 6.3.6 기생 조합 상속

### 6.4 요약 
 - ECMAScript는 클래스나 인터페이스 개념 없이 객체지향 프로그래밍을 지원
   - 팩터리 패턴
   - 생성자 패턴
   - 프로토타입 패턴
 - 자바스크립트에서 상속은 프로토타입 체인 개념을 통해 구현.
   - 프로토타입 체인
     - 생성자의 프로토타입에 다른 타입의 인스턴스를 할당하는 방법.