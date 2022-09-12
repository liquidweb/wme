export const createInput = (name = '', value = '', form: HTMLFormElement | null = null) => {
	const input = document.createElement('input');
	input.name = name;
	input.value = value;

	if (form) {
		form?.appendChild(input);
	}

	return input;
};
