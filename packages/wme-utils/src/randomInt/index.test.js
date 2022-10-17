const { randomInt } = require('../../dist/es5/randomInt');

describe('randomInt', () => {
  test('true', () => {
    expect(randomInt(5, 25)).toBeGreaterThanOrEqual(5);
    expect(randomInt(5, 25)).toBeLessThanOrEqual(25);
    expect(randomInt(10, 15)).toBeGreaterThanOrEqual(10);
    expect(randomInt(10, 15)).toBeLessThanOrEqual(15);
    expect(randomInt('10', '15')).toBeGreaterThanOrEqual(10);
    expect(randomInt('10', '15')).toBeLessThanOrEqual(15);
    expect(randomInt(10, '15')).toBeGreaterThanOrEqual(10);
    expect(randomInt(10, '15')).toBeLessThanOrEqual(15);
    expect(randomInt(10, '')).toBeLessThan(10);
    expect(randomInt('', 10)).toBeLessThan(10);
  });

  test('false', () => {
    expect(randomInt()).toBeNaN();
    expect(randomInt(12, {})).toBeNaN();
    expect(randomInt(12, () => undefined)).toBeNaN();
  });
});
