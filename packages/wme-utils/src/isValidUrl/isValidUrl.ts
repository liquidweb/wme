/**
 * Check if sting is a valud URL
 *
 * @param {string} url - String to check
 * @return {boolean} - Is url valid
 */
const isValidUrl = (url: string): boolean => {
  try {
    const urlTest = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export default isValidUrl;
