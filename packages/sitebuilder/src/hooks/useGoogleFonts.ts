
interface FontsInterface {
	id: string;
	baseFont: string;
	headingFont: string;
}

export function useGoogleFonts() {
	const fonts: FontsInterface[] = [
		{
			id: 'one',
			headingFont: 'Roboto',
			baseFont: 'Baskerville',
		},
	];

	return fonts;
}
