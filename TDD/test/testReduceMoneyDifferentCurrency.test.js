const Money = require('../src/Money');
const Bank = require('../src/Bank');

test('test reduce money different currency', () => {
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  console.log('bank', bank);
  const result = bank.reduce(Money.franc(2), 'USD');
  expect(result).toEqual(Money.dollar(1));
});
