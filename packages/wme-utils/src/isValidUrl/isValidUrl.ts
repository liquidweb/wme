/**
 * Check if sting is a valid URL
 *
 * @param {string} url - String to check
 * @return {boolean} - Is url valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlTest = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
