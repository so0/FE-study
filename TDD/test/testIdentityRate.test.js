const Sum = require('../src/Sum');
const Money = require('../src/Money');
const Bank = require('../src/Bank');

test('test identity rate', () => {
  expect(new Bank().rate('USD', 'USD')).toEqual(1);
});
