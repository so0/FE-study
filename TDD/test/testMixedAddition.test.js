const Bank = require('../src/Bank');
const Money = require('../src/Money');

test('15 test mixed addition', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();
  const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');
  expect(result).toEqual(Money.dollar(10));
});
