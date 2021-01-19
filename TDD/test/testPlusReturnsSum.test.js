const Money = require('../src/Money');

test('test plust returns Sum', () => {
  const five = Money.dollar(5);
  const result = five.plus(five);
  const sum = result;
  expect(five).toEqual(sum.augend);
  expect(five).toEqual(sum.addend);
});
