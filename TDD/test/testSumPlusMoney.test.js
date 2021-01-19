const Money = require('../src/Money');
const Bank = require('../src/Bank');
const Sum = require('../src/Sum');

test('test sum plus money', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
  const result = bank.reduce(sum, 'USD');
  expect(result).toEqual(Money.dollar(15));
});
