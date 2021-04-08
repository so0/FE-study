import * as domutil from '../domutil';

describe('dom util test', () => {
  let handler, $btn;
  beforeEach(() => {
    document.body.innerHTML = `<input type="button" class="btn"></input>`;
    handler = jest.fn();
    $btn = document.querySelector('.btn');
  });
  test('error', () => {
    expect(() => domutil.on()).toThrowError();
    expect(() => domutil.on(null)).toThrowError();
    expect(() => domutil.on('btn')).toThrowError();
    expect(() => domutil.on(1)).toThrowError();
    expect(() => domutil.on(true)).toThrowError();
    expect(() => domutil.on({})).toThrowError();
    expect(() => domutil.on('.btn', null)).toThrowError();
    expect(() => domutil.on('.btn', 1)).toThrowError();
    expect(() => domutil.on('.btn', true)).toThrowError();
    expect(() => domutil.on('.btn', {})).toThrowError();
    expect(() => domutil.on('.btn', () => {})).toThrowError();
    expect(() => domutil.on('.btn', 'click')).toThrowError();
    expect(() => domutil.on('.btn', 'click', null)).toThrowError();
    expect(() => domutil.on('.btn', 'click', true)).toThrowError();
    expect(() => domutil.on('.btn', 'click', 1)).toThrowError();
    expect(() => domutil.on('.btn', 'click', 'test')).toThrowError();
    expect(() => domutil.on('.btn', 'click', {})).toThrowError();
  });

  test('dom event binding1', () => {
    domutil.on($btn, 'click', handler);
    $btn.click();
    expect(handler).toHaveBeenCalledTimes(1);

    domutil.off($btn, 'click', handler);
    $btn.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('dom event binding1', () => {
    domutil.on('.btn', 'click', handler);
    $btn.click();
    expect(handler).toHaveBeenCalledTimes(1);

    domutil.off('.btn', 'click', handler);
    $btn.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
