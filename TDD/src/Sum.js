const Expression = require('./Expression');
const Money = require('./Money');

class Sum extends Expression {
  constructor(augend, addend) {
    super();
    this.augend = augend;
    this.addend = addend;
  }
  reduce(bank, to) {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}

module.exports = Sum;
