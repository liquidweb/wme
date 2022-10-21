/**
 * Converts a pixel unit into Rem
 *
 * @param {number} size - Pixel value
 * @param {number} rootFontSize - Root font size for document
 * @return {string | null} Rem unit
 */
export const pxToRem = (size: number, rootFontSize = 16): string | null => {
  if (typeof size === 'number' && typeof rootFontSize === 'number') {
    return `${parseFloat((size / rootFontSize).toFixed(4))}rem`;
  }
  return null;
};
