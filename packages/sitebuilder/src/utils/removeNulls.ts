type Validate<T> = Pick<T, {
  [Prop in keyof T]: T[Prop] extends null ? never : Prop
}[keyof T]>

// @see https://stackoverflow.com/a/70363240
export function removeNulls<T extends {}, >(o: T): Validate<T> {
	const newObject = o;

	Object.keys(newObject).forEach((key) => {
		if (newObject[ key as keyof typeof newObject ] === null) {
			delete newObject[ key as keyof typeof newObject ];
		}
	});

	return newObject;
}
