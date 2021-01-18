class Money {
  constructor(amount) {
    this.amount = amount;
  }
  equals(object) {
    const money = object;
    return this.amount === money.amount;
  }
}

module.exports = Money;
