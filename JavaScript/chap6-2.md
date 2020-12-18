# 6장 객체 지향 프로그래밍

### 6.3 상속
 객체 지향 언어
  - 인터페이스 상속 - 메서드 시그니처만 상속
  - 구현 상속 - 실제 메서드를 상속
 ECMAScript에는 함수 시그니처가 없으므로 인터페이스 상속 불가능하며 구현 상속만 지원한다.
 구현 상속은 대개 프로토타입 체인을 통해 이루어짐.

#### 6.3.1 프로토타입 체인
 프로토타입 개념을 이용해 두 가지 참조타입 사이에서 프로퍼티와 메서드를 상속하는것. 
  모든 생성자에게는 생성자 자신을 가리키는 프로토 타입 객체가 있고, 인스턴스는 프로토타입을 가리키는 내부 포인터가 있음. 
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
SubType.prototype = new SuperType();

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
- 프로토타입 체인 - 프로토타입 검색 메커니즘
  - 인스턴스에서 프로퍼티 검색 - instance
  - 프로토타입에서 프로퍼티 검색 - SubType.prototype
  - 체인을 타고 올라가면 계속 검색 - Supertype.prototype


##### _기본 프로토타입_
모든 참조 타입은 기본적으로 프로토타입 체인을 통해 Object를 상속한다.
함수의 기본 프로토타입은 Object의 인스턴스이므로, 함수 내부의 프로토타입 포인터는 Object.proototype을 가리킨다.
 - toString(), valueOf() 같은 Object의 프로토타입 메서드를 상속 받는다.

##### _프로토타입과 인스턴스 사이의 관계_
 - instanceof 연산자
   - 인스턴스 생성자가 프로토타입 체인에 존재할 때 true 반환
   - instance  객체는 프로토타입 체인 관계에 의해 Object, SuperType, SubType 모두의 인스턴스임.
```js
console.log(instance instanceof Object)
console.log(instance instanceof SuperType)
console.log(instance instanceof SubType)
```
 - isPrototypeOf() 메서드
   - 프로토타입 체인에 존재하는 인스턴스에 true 반환
```js
console.log(Object.prototype.isPrototypeOf(instance))
console.log(SuperType.prototype.isPrototypeOf(instance))
console.log(SubType.prototype.isPrototypeOf(instance))
```
##### _메서드_
 하위 타입에서 상위 타입의 메서드를 오버라이드 하거나, 상위 타입에 존재하지 않는 메서드를 정의해야 할 경우, 프로토타입이 할당된 다음에 추가해야함.
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
SubType.prototype = new SuperType();

//new method
SubType.prototype.getSubValue = function (){
  return this.subproperty;
};

//override existing method
SubType.prototype.getSuperValue = function (){
  return false;
};

var instance = new SubType();
console.log(instance.getSuperValue());   //false


 ```
##### _프로토타입 체인의 문제_
프로토타입 프로퍼티에 들어있는 참조값은 인스턴스에서 공유된다. => 프로토타입 체인만 단독으로 쓰는 경우는 없음.

#### 6.3.2 생성자 훔치기
 "생성자 훔치기" (constrruct stealing)
하위 타입 생성자 안에서 상위 타입 생성자를 호출하는것. 
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
console.log(instance1.colors);    //"red,blue,green,black"

var instance2 = new SubType();
console.log(instance2.colors);    //"red,blue,green"
```
- SuperType 함수에 들어있는 초기화 코드를 SubType객체에서 실행하는 효과. 
##### _매개변수 전달_
 하위 타입 생성자 안에서 상위 타입의 생성자에 매개변수를 전달할 수 있다.
```js
function SuperType(name){
    this.name = name;
}

function SubType(){  
    //inherit from SuperType passing in an argument
    SuperType.call(this, "Nicholas");
    
    //instance property
    this.age = 29;
}

var instance = new SubType();
console.log(instance.name);    //"Nicholas";
console.log(instance.age);     //29
```

##### _생성자 훔치기 패턴의 문제_
메서드를 생성자 내부에서만 정의해야해서 함수 재사용이 불가능.
상위타입의 프로토타입에 정의된 메서드는 하위 타입에서 접근 불가능.
 => 단독으로 안쓴다,

#### 6.3.3 조합 상속
'조합 상속' (가상의 전통적 상속 pseudoclassical inheritance)
프로토타입 체인과 생성자 함수 훔치기 패턴으로 인스턴스 프로퍼티를 상속하는 것.
- 프로토타입에 메서드 정의하여 재사용.
- 각 인스턴스의 고유 프로퍼티를 가질 수 있음
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
console.log(instance1.colors);  //"red,blue,green,black"
instance1.sayName();      //"Nicholas";
instance1.sayAge();       //29


var instance2 = new SubType("Greg", 27);
console.log(instance2.colors);  //"red,blue,green"
instance2.sayName();      //"Greg";
instance2.sayAge();       //27
```
 - 자바스크립트에서 가장 자주 쓰이는 상속 패턴.
 - instanceof(), isPrototypeOf() 에서도 올바른 결과 반환.
  
#### 6.3.4 프로토타입 상속
 엄격히 정의된 생성자를 쓰지 않고도 상속을 구현하는 방법. - 더글라스 크록포드

```js
function object(o){
  function F(){}
  F.prototype=o;
  return new F();
}
```
 object() 함수는 임시 생성자를 만들어 객체를 생성자의 프로토타입으로 할당한 뒤 임시 생성자의 인스턴스를 반환. 

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

console.log(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
 ```
 ES5에서 프로토타입 상속 개념을 수용하여 `Object.create()` 메서드를 추가함.
 > Object.prototype(프로토타입이 될 객체, 추가할 프로퍼티를 담은 객체)

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

console.log(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
```
 - 프로토타입 상속으로 만든 객체는 생성자를 따로 만들 수 없다는 점에서 유용함. 
#### 6.3.5 기생 상속
 '기생 상속' - 더글라스 크록포드. - 인기 있는 패턴. 
 상속을 담당할 함수를 만들고, 객체를 확장해서 반환한다.

```js
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
function createAnother(original){
  var clone = object(original); // 새 객체 생성
  clone.sayHi = function() { // 객체 확장
    console.log('hi')
  }
  return clone; // 확장된 객체를 반환.
}


var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
}
var anotherPerson = createAnother(person)
anotherPerson.sayHy();

```
#### 6.3.6 기생 조합 상속
- 조합 상속은 자주 쓰는 패턴이지만 비효율적인 면이 있다.
- 상위 타입 생성자가 항상 두 번 호출된다는 점.
  - 하위 타입은 프로토타입을 생성하기 위해
  - 하위 타입 생성자 내부에서
- 
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

기생 조합 상속
 - 생성자 훔치기를 통해 프로퍼티 상속을 구현, 메서드 상속에는 프로토타입 체인 혼용.

```js
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType){ // 메서드 상속을 위해 프로토타입 체인 사용.
  var prototype = object(superType.prototype);   //create object
  prototype.constructor = subType;               //augment object
  subType.prototype = prototype;                 //assign object
}
                      
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
  console.log(this.name);
};

function SubType(name, age){  
  SuperType.call(this, name); // 생성자 훔치기를 통해 프로퍼티 상속.
  
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);  //"red,blue,green,black"
instance1.sayName();      //"Nicholas";
instance1.sayAge();       //29


var instance2 = new SubType("Greg", 27);
console.log(instance2.colors);  //"red,blue,green"
instance2.sayName();      //"Greg";
instance2.sayAge();       //27

```
- 기생 상속을 사용해서 상위 타입의 프로토타입을 하위 타입의 프로토타입에 할당. 
- SuperType생성자를 한 번만 호출함. - SubType.prototype에 불필요하고 사용하지 않는 상위 타입의 프로퍼티를 만들지 않음.
- 프로토타입 체인이 온전히 유지됨. - instanceof, isPrototypeOf도 정상 동작.
- 가장 효율적인 상속 패러다임. 
### 6.4 요약 
 - ECMAScript는 클래스나 인터페이스 개념 없이 객체지향 프로그래밍을 지원
   - 팩터리 패턴
   - 생성자 패턴
   - 프로토타입 패턴
 - 자바스크립트에서 상속은 프로토타입 체인 개념을 통해 구현.
   - 프로토타입 체인
     - 생성자의 프로토타입에 다른 타입의 인스턴스를 할당하는 방법.
 - 생성자 훔치기 패턴
 - 프로토타입체인 + 생성자 훔치기
 - 기생 상속
 - 기생 조합 상속