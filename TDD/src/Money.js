// const Dollar = require('./Dollar');
// const Franc = require('./Franc');

class Money {
  constructor(amount) {
    this.amount = amount;
  }
  equals(object) {
    const money = object;
    return this.amount === money.amount;
  }
  static dollar(amount) {
    return new Dollar(amount);
  }
  static franc(amount) {
    return new Franc(amount);
  }
}

class Dollar extends Money {
  constructor(amount) {
    super(amount);
  }
  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}

class Franc extends Money {
  constructor(amount) {
    super(amount);
  }
  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
}

module.exports.Money = Money;
module.exports.Dollar = Dollar;
module.exports.Franc = Franc;
