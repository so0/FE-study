const Dollar = require('../src/Dollar');
const Franc = require('../src/Franc');

test('test equality', () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
  expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
  expect(new Franc(5).equals(new Franc(6))).toBeFalsy();

  expect(new Franc(5).equals(new Dollar(5))).toBeFalsy(); // 타입이 다름
});
