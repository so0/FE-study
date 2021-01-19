const Pair = require('../src/Pair');

class Bank {
  constructor() {
    this.rates = new Map();
  }
  reduce(source, to) {
    return source.reduce(to);
  }
  rate(from, to) {
    if (from === to) return 1;
    const rate = this.rates.get(new Pair(from, to).toString());
    console.log('rate', rate);
    return rate;
  }
  addRate(from, to, rate) {
    this.rates.set(new Pair(from, to).toString(), rate);
  }
}

module.exports = Bank;
