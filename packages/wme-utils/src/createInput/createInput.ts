/**
 * Create form input, or appends input to existing form.
 *
 * @param {string} name - Name of the input
 * @param {string} value - Value of the input
 * @param {(HTMLFormElement|null)} [form=null] form - Value of the input
 * @return {HTMLInputElement}
 */
export const createInput = (
  name = '',
  value = '',
  form: HTMLFormElement | null = null,
) => {
  const input = document.createElement('input');
  input.name = name;
  input.value = value;

  if (form) {
    form?.appendChild(input);
  }

  return input;
};
