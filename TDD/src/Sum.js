const Expression = require('./Expression');
const Money = require('./Money');

class Sum extends Expression {
  constructor(augend, addend) {
    super();
    this.augend = augend;
    this.addend = addend;
  }
  reduce(bank, to) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }
  plus(addend) {
    return new Sum(this, addend);
  }
}

module.exports = Sum;
