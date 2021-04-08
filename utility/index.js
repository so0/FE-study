import { util } from './classutil.js';

const Animal = util.defineClass({
  init: function () {
    console.log('animal init');
    this.name = 'choko';
  },
  walk: function () {
    console.log('walk');
  },
});

const a = new Animal();
console.log('a', a);
a.walk();

const Person = util.defineClass(
  {
    init: function () {
      console.log('Person init');
      this.name = 'babo';
      this.age = 3;
    },
    talk: function () {
      console.log('talk');
    },
  },
  Animal
);

const p = new Person();
console.log('p', p);
p.walk();
p.talk();
