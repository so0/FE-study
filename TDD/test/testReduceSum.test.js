const Sum = require('../src/Sum');
const Money = require('../src/Money');
const Bank = require('../src/Bank');

test('test reduce sum', () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result = bank.reduce(sum, 'USD');
  expect(Money.dollar(7)).toEqual(result);
});
