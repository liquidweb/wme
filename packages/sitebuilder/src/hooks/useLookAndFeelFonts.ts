import { IMAGE_DIR } from '@sb/constants';

const fontsImagePath = `${ IMAGE_DIR }fonts/`;
interface FontsInterface {
	name: string;
	font: string;
	img: string;
}

export function useLookAndFeelFonts() {
	const fonts: FontsInterface[] = [
		{
			name: 'Montserrat & Source Sans Pro',
			font: 'montserrat',
			img: `${ fontsImagePath }antic.jpg`,
		},
		{
			name: 'Libre Franklin & Libre Baskerville',
			font: 'libre',
			img: `${ fontsImagePath }libre.jpg`,
		},
		{
			name: 'Proza Libre & Open Sans',
			font: 'proza',
			img: `${ fontsImagePath }proza.jpg`,
		},
		{
			name: 'Work Sans & Work Sans',
			font: 'worksans',
			img: `${ fontsImagePath }worksans.jpg`,
		},
		{
			name: 'Josefin Sans & Lato',
			font: 'josefin',
			img: `${ fontsImagePath }josefin.jpg`,
		},
		{
			name: 'Oswald & Open Sans',
			font: 'oswald',
			img: `${ fontsImagePath }oswald.jpg`,
		},
		{
			name: 'Nunito & Roboto',
			font: 'nunito',
			img: `${ fontsImagePath }nunito.jpg`,
		},
		{
			name: 'Rubik & Karla',
			font: 'rubik',
			img: `${ fontsImagePath }rubik.jpg`,
		},
		{
			name: 'Lora & Merriweather',
			font: 'lora',
			img: `${ fontsImagePath }lora.jpg`,
		},
		{
			name: 'Playfair Display & Raleway',
			font: 'playfair',
			img: `${ fontsImagePath }playfair.jpg`,
		},
		{
			name: 'Antic Didone & Raleway',
			font: 'antic',
			img: `${ fontsImagePath }antic.jpg`,
		},
		{
			name: 'Gilda Display & Raleway',
			font: 'gilda',
			img: `${ fontsImagePath }gilda.jpg`,
		},
	];

	return fonts;
}
