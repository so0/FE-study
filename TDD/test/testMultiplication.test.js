const Dollar = require('../src/Dollar');

test('test Multiplication', () => {
  const five = new Dollar(5);
  five.times(2);
  expect(five.amount).toBe(10);
});
