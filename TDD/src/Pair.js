class Pair {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  toString() {
    return `${this.from}-${this.to}`;
  }
}

module.exports = Pair;
