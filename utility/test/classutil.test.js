import * as util from '../classutil';

describe('class util test', () => {
  let Animal, Person;
  beforeEach(() => {
    // given
    Animal = util.defineClass({
      init: function (name) {
        this.name = 'foo';
      },
      walk: function () {
        console.log('animal walk');
      },
      setName(name) {
        this.name = name;
      },
    });
    Person = util.defineClass(
      {
        init: function () {
          console.log('Person init');
          this.name = 'kim';
          this.age = 20;
        },
        talk: function () {
          console.log('Person talk');
        },
      },
      Animal
    );
  });
  test('constructor', () => {
    // when
    const animalIns = new Animal();

    // then
    expect(Animal.prototype.constructor).toEqual(Animal);
    expect(animalIns.constructor).toEqual(Animal);

    // when
    const personIns = new Person();

    // then
    expect(Person.prototype.constructor).toEqual(Person);
    expect(personIns.constructor).toEqual(Person);
  });

  test('error', () => {
    expect(() => util.defineClass()).toThrowError();
    expect(() => util.defineClass(null)).toThrowError();
    expect(() => util.defineClass(false)).toThrowError();
    expect(() => util.defineClass(1)).toThrowError();

    expect(() => util.defineClass(() => {})).toThrowError();
    expect(() => util.defineClass('test')).toThrowError();
    const childTemp = { test: 1 };
    expect(() => util.defineClass(childTemp, true)).toThrowError();
    expect(() => util.defineClass(childTemp, 1)).toThrowError();
    expect(() => util.defineClass(childTemp, 'test')).toThrowError();
  });

  test('create instance', () => {
    const instance = new Animal();
    expect(instance).toHaveProperty('name');
    expect(instance).toHaveProperty('walk');
    expect(instance).toHaveProperty('name', 'foo');
    instance.setName('bar');
    expect(instance.name).toBe('bar');
  });
  test('person instance extend test', () => {
    const instance = new Person('kim');
    expect(instance).toHaveProperty('name');
    expect(instance).toHaveProperty('walk');
    expect(instance).toHaveProperty('talk');
    expect(instance).toHaveProperty('name', 'kim');
    instance.setName('lee');
    expect(instance.name).toBe('lee');
  });

  test('init method test', () => {
    const parentInit = jest.fn();
    const childInit = jest.fn();

    const Parent = util.defineClass({
      init: parentInit,
    });

    const Child = util.defineClass(
      {
        init: childInit,
      },
      Parent
    );
    const Child2 = util.defineClass(
      {
        description: 'no init',
      },
      Parent
    );
    new Child2();
    expect(parentInit).not.toHaveBeenCalled();

    new Parent();
    expect(parentInit).toHaveBeenCalled();

    new Child();
    expect(parentInit).toHaveBeenCalledTimes(2);
    expect(childInit).toHaveBeenCalledTimes(1);
  });
});
