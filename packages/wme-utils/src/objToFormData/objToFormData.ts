/**
 * Convert object into FormData object
 *
 * @param {Object} data - Object to convert
 * @return {FormData} - FormData object
 */
 export const objToFormData = (data: object) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key as keyof typeof data]);
  });

  return formData;
};
