const Money = require('../src/Money');

test('test different class equality', () => {
  expect(new Money(10, 'CHF').equals(new Money(10, 'CHF'))).toBeTruthy();
});
