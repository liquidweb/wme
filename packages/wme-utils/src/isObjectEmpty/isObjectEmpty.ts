/**
 * Check if object is empty
 *
 * @param {Object} obj - Object to check
 * @return {boolean} - Is ojbect empty
 */
export const isObjectEmpty = (obj: object): boolean => Object.keys(obj || {}).length === 0;
