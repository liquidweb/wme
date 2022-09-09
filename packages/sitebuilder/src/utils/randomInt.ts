export function randomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	// eslint-disable-next-line no-mixed-operators
	return Math.floor(Math.random() * (max - min) + min);
}
