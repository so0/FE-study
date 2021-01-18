const { Money, Franc } = require('../src/Money');

test('test different class equality', () => {
  expect(new Franc(10, 'CHF').equals(new Money(10, 'CHF'))).toBeTruthy();
});
