describe('Jest Hooks', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });
  afterAll(() => {
    console.log('afterAll');
  });
  beforeEach(() => {
    console.log('beforeEach');
  });
  afterEach(() => {
    console.log('afterEach');
  });

  test('1', () => {
    expect(1 + 1).toBe(2);
    console.log('test 1 is done!');
  });
  test('2', () => {
    expect(2 + 1).toBe(3);
    console.log('test 2 is done!');
  });
});
