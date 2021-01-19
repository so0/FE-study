const Sum = require('./Sum');

class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
  equals(object) {
    const money = object;
    return this.amount === money.amount && this.currency === money.currency;
  }
  toString() {
    // 디버깅용
    return this.amount + ' ' + this.currency;
  }
  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }
  plus(addend) {
    return new Sum(this, addend);
  }
  reduce(bank, to) {
    const rate = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }
  static dollar(amount) {
    return new Money(amount, 'USD');
  }
  static franc(amount) {
    return new Money(amount, 'CHF');
  }
}

module.exports = Money;
