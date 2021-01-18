const Money = require('../src/Money');

test('test Multiplication', () => {
  const five = Money.franc(5);
  expect(five.times(2)).toEqual(Money.franc(10));
  expect(five.times(3)).toEqual(Money.franc(15));
});
