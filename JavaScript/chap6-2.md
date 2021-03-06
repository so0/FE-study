# 6장 객체 지향 프로그래밍

### 6.3 상속
>  ECMAScript에는 함수 시그니처가 없으므로 인터페이스 상속이 불가능하며 실제 메서드를 상속하는 구현 상속만 지원, 대개 프로토타입 체인을 통해 이루어짐.

#### 6.3.1 프로토타입 체인
 프로토타입 개념을 이용해 프로퍼티와 메서드를 상속하는것. 
  모든 생성자는 "생성자 자신을 가리키는 프로토타입 객체(`prototype`)"가 있고, 인스턴스는 "프로토타입을 가리키는 내부 포인터 (`__proto__`)"가 있음. 
  - 프로토타입이 다른 타입의 인스턴스일 경우 프로토타입을 잇는 체인이 형성된다. 
```js
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//inherit from SuperType
SubType.prototype = new SuperType(); // SuperType의 인스턴스 할당

SubType.prototype.getSubValue = function (){
    return this.subproperty;
};

var instance = new SubType(); 
console.log(instance.getSuperValue());

console.log(instance instanceof Object);   
console.log(instance instanceof SuperType);
console.log(instance instanceof SubType);  

console.log(Object.prototype.isPrototypeOf(instance)); 
console.log(SuperType.prototype.isPrototypeOf(instance)); 
console.log(SubType.prototype.isPrototypeOf(instance));
```
- SubType 프로토타입 대신 SuperType의 인스턴스가 할당됨.
![프로토타입체인](../images/프로토타입체인.png)
- 프로퍼티 검색 과정
  - 인스턴스(`instance`)에서 프로퍼티 검색 - instance
  - 프로토타입(`SubType.prototype`)에서 프로퍼티 검색 
  - 체인을 타고 올라가면 계속 검색
    -  `Supertype.prototype` -> `Object.prototype`


##### _기본 프로토타입_
> 모든 참조 타입은 기본적으로 프로토타입 체인을 통해 **Object**를 상속한다.
  함수의 기본 프로토타입은 **Object의 인스턴스**이므로, 함수 내부의 프로토타입 포인터는 `Object.proototype`을 가리킨다.
 - `toString()`, `valueOf()` 같은 Object의 프로토타입 메서드를 상속 받는다.
 - [Object 프로토타입 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
  
##### _프로토타입과 인스턴스 사이의 관계_
 - `instanceof` 연산자
   - 인스턴스 생성자가 프로토타입 체인에 존재할 때 `true` 반환
   - instance 객체는 프로토타입 체인 관계에 의해 Object, SuperType, SubType 모두의 인스턴스임.
```js
console.log(instance instanceof Object)
console.log(instance instanceof SuperType)
console.log(instance instanceof SubType)
```
 - `isPrototypeOf()` 메서드
   - 프로토타입 체인에 존재하는 인스턴스에 `true` 반환
```js
console.log(Object.prototype.isPrototypeOf(instance))
console.log(SuperType.prototype.isPrototypeOf(instance))
console.log(SubType.prototype.isPrototypeOf(instance))
```

##### _프로토타입 체인의 문제_
 문제점 1: 
    - 프로로타입으로 상속 구현 시 프로토타입이 다른 타입의 인스턴스가 되므로 처음에 인스턴스 프로퍼티였던 것들이 프로토타입 프로퍼티로 동작하게 됨.
     (프로토타입 프로퍼티에 들어있는 **참조값**은 모든 인스턴스에서 공유)
```js
function SuperType(){
  this.colors = ["red", "blue", "green"];
}

function SubType(){            
}

//inherit from SuperType
SubType.prototype = new SuperType(); 

var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors);  

var instance2 = new SubType();
console.log(instance2.colors);  

```
 ![프로토타입체인의문제.png](../images/프로토타입체인의문제.png)

 문제점 2 : 
  - 하위 타입 인스턴스를 만들 때 상위 타입 생성자에 매개변수를 전달할 수 없다.

#### 6.3.2 생성자 훔치기
  "생성자 훔치기" (construct stealing, 위장 객체 object masquerading, 전통적 상속 classical stealing)
- 하위 타입 생성자 안에서 상위 타입 생성자를 호출하는것. 
```js
function SuperType(){
    this.colors = ["red", "blue", "green"];
}

function SubType(){  
    //inherit from SuperType
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors);   

var instance2 = new SubType();
console.log(instance2.colors); 
```
![생성자훔치기](../images/생성자훔치기.png)
- SuperType 함수에 들어있는 초기화 코드를 SubType 객체에서 실행하는 효과. 
- 참조값(`colors`)이 모든 인스턴스에서 공유되는 문제 해결 

##### _매개변수 전달_
 하위 타입 생성자 안에서 상위 타입의 생성자에 매개변수를 전달할 수 있다.
```js
function SuperType(name){
    this.name = name;
    // 메서드 정의
}

function SubType(){  
    //inherit from SuperType passing in an argument
    SuperType.call(this, "Nicholas"); 
    //instance property
    this.age = 29;
}

var instance = new SubType();
console.log(instance.name);   
console.log(instance.age); 
```
![매개변수전달](../images/매개변수전달.png)


##### _생성자 훔치기 패턴의 문제_
 - 메서드를 생성자 내부에서만 정의해야해서 함수 재사용이 불가능.  
 - 상위 타입의 프로토타입에 정의된 메서드는 하위 타입에서 접근 불가능.
 > 단독으로 안쓴다,

#### 6.3.3 조합 상속
조합 상속 (가상의 전통적 상속 pseudoclassical inheritance)
**프로토타입 체인**과 **생성자 함수 훔치기** 패턴을 조합.
- 프로토타입 체인으로 **메서드** 정의하여 함수를 **재사용.**
- 생성자 훔치기 패턴으로 각 **인스턴스**는 **고유한 프로퍼티**를 가질 수 있음
```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
  console.log(this.name);
};

function SubType(name, age){  
  SuperType.call(this, name);
  
  this.age = age;
}

SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); 
instance1.sayName();     
instance1.sayAge();      


var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); 
instance2.sayName();     
instance2.sayAge();      
```
![조합상속](../images/조합상속.png)
 - 자바스크립트에서 가장 자주 쓰이는 상속 패턴.
 - `instanceof()`, `isPrototypeOf`에서도 올바른 결과 반환.

#### 6.3.4 프로토타입 상속
 엄격히 정의된 **생성자를 쓰지 않고**도 상속을 구현하는 방법. - _'더글라스 크록포드'_
  - 프로토타입을 사용해 새 객체를 생성할 때 반드시 커스텀 타입을 정의할 필요는 없다. 

```js
function object(o){ 
  function F(){}
  F.prototype=o;
  return new F();
}

```
 - object() 함수는 **임시 생성자**를 만들어 객체를 생성자의 프로토타입으로 할당한 뒤 임시 생성자의 인스턴스를 반환. 

 ```js
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";  
anotherPerson.friends.push("Rob"); 

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends);  
 ```

![프로토타입상속](/images/프로토타입상속.png)

 ES5에서 프로토타입 상속 개념을 수용하여 `Object.create()` 메서드를 추가함.
 > Object.prototype(프로토타입이 될 객체, 새 객체에 추가할 프로퍼티를 담은 객체)

```js
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends);  
```

 - 프로토타입 상속으로 만든 객체는 생성자를 다 따로 만들 필요는 없다는 점에서 유용함. 
 - 참조값 프로퍼티는 인스턴스에서 값을 공유함.  (`friends`)
 - 
#### 6.3.5 기생 상속
 "기생 상속" : 프로토타입 상속과 연관된 인기있는 패턴. - _더글라스 크록포드_
 - 상속을 담당할 함수를 만들고, 객체를 확장해서 반환한다.

```js
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
function createAnother(original){ 
  var clone = object(original);    // 함수를 호출하여 새 객체 생성
  clone.sayHi = function() {       // 객체 확장
    console.log('hi')
  }
  return clone;                    // 확장된 객체를 반환.
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
}
var anotherPerson = createAnother(person)
anotherPerson.sayHi();

```

#### 6.3.6 기생 조합 상속
- 조합 상속 (프로토타입 체인과 생성자 함수 훔치기 패턴을 조합한 상속)은 자주 쓰는 패턴이지만 비효율적이다. - 상위 타입의 생성자를 두 번 호출 하기 때문.

- 조합 상속 다시보기
  ```js

  function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  SuperType.prototype.sayName = function(){
    console.log(this.name);
  };

  function SubType(name, age){  
    SuperType.call(this, name); // 생성자 두번째 호출
    this.age = age;
  }

  SubType.prototype = new SuperType(); // 생성자 첫번째 호출
  SubType.prototype.constuctor = SubType;
  SubType.prototype.sayAge = function(){
    console.log(this.age);
  };

  ```
  ![조합상속프로퍼티중복](/images/조합상속프로퍼티중복.png)
   - name, colors 프로퍼티 중복. 

**기생 조합 상속**
 - 생성자 훔치기를 통해 프로퍼티 상속을 구현, 메서드 상속에는 프로토타입 체인 혼용.

 - inheritPrototype() 함수
    ```js
    function object(o){
      function F(){}
      F.prototype = o;
      return new F();
    }

    function inheritPrototype(subType, superType){ 
      var prototype = object(superType.prototype);   // 상위 타입 프로토타입 복제
      prototype.constructor = subType;               // 기본 constructor 연결 
      subType.prototype = prototype;                 // 하위 타입 프로토타입에 새로 만든 객체 할당.
    }
    
    inheritPrototype(SubType, SuperType); // 하위 타입 프로토타입 할당 대체
    ```
    ![기생조합상속-메서드상속](/images/기생조합상속-메서드상속.png)

```js
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType){ // 메서드 상속에는 프로토타입 체인 사용.
  var prototype = object(superType.prototype);   // 객체 생성
  prototype.constructor = subType;               // 객체 확장
  subType.prototype = prototype;                 // 객체 할당
}
                      
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
  console.log(this.name);
};

function SubType(name, age){  
  SuperType.call(this, name); // 생성자 훔치기를 통해 상위 타입의 인스턴스 프로퍼티 상속.
  
  this.age = age;
}

inheritPrototype(SubType, SuperType); // 하위 타입 프로토타입 할당 대체


SubType.prototype.sayAge = function(){
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);  
instance1.sayName();      
instance1.sayAge();       


var instance2 = new SubType("Greg", 27);
console.log(instance2.colors);  
instance2.sayName();      
instance2.sayAge();       

```

![기생조합상속](/images/기생조합상속.png)

- 기생 상속을 사용해서 상위 타입의 프로토타입을 하위 타입의 프로토타입에 할당. 
- 상위 타입 생성자를 한 번만 호출함. - SubType.prototype에 불필요한 상위 타입의 프로퍼티를 만들지 않음.
- 프로토타입 체인 온전히 유지 + instanceof, isPrototypeOf 정상 작동
- 가장 효율적인 상속 패러다임. 
