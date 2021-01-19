const Money = require('../src/Money');
const Bank = require('../src/Bank');

test('test Simple Addition', () => {
  // const sum = Money.dollar(5).plus(Money.dollar(5));
  // expect(sum).toEqual(Money.dollar(10));

  const five = Money.dollar(5);
  const sum = five.plus(five);
  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD');
  expect(reduced).toEqual(Money.dollar(10));
});
