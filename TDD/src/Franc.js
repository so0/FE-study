class Franc {
  constructor(amount) {
    this.amount = amount;
  }
  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
  equals(object) {
    const franc = object;
    return this.amount === franc.amount;
  }
}

module.exports = Franc;
