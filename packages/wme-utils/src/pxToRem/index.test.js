const { pxToRem } = require('../../dist/es5/pxToRem');

describe('pxToRem', () => {
  test('true', () => {
    expect(pxToRem(12)).toBe('0.75rem');
    expect(pxToRem(12, 14)).toBe('0.8571rem');
  });

  test('false', () => {
    expect(pxToRem(12, '')).toBeNull();
    expect(pxToRem(12, [])).toBeNull();
    expect(pxToRem(12, {})).toBeNull();
    expect(pxToRem(12, () => undefined)).toBeNull();
    expect(pxToRem(12, Symbol('my symbol'))).toBeNull();
  });
});
