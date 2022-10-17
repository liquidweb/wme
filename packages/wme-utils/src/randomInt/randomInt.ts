/**
 * Create randome number between min and max.
 *
 * @param {number} min
 * @param {number} max
 * @return {number} - Random number
 */
export const randomInt = (min: number, max: number): number => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  // eslint-disable-next-line no-mixed-operators
  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
};
