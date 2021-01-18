// const Dollar = require('./Dollar');
// const Franc = require('./Franc');

class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
  equals(object) {
    const money = object;
    return this.amount === money.amount;
  }
  static dollar(amount) {
    return new Dollar(amount, 'USD');
  }
  static franc(amount) {
    return new Franc(amount, 'CHF');
  }
}

class Dollar extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }
  times(multiplier) {
    return Money.dollar(this.amount * multiplier);
  }
  currency() {
    return this.currency;
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }
  times(multiplier) {
    return Money.franc(this.amount * multiplier);
  }
  currency() {
    return this.currency;
  }
}

module.exports.Money = Money;
module.exports.Dollar = Dollar;
module.exports.Franc = Franc;
