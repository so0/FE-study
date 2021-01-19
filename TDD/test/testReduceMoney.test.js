const Money = require('../src/Money');
const Bank = require('../src/Bank');

test('test reduce money', () => {
  const bank = new Bank();
  const result = bank.reduce(Money.dollar(1), 'USD');
  expect(result).toEqual(Money.dollar(1));
});
