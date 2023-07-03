export type FontDetails = {
	size: string;
	lineHeight: string;
	letterSpacing: string;
	fontWeight: string;
}

export interface StyleInterface {
	id: string;
	headingFont: string;
	baseFont: string;
	baseFontStyles: FontDetails;
	accent1: string;
	accent2: string;
	contrast1: string;
	contrast2: string;
	contrast3: string;
	contrast4: string;
	base1: string;
	base2: string;
	base3: string;
	textTransform?: string;
	h1: FontDetails;
	h2: FontDetails;
	h3: FontDetails;
	h4: FontDetails;
	h5: FontDetails;
	h6: FontDetails;
	buttonStyles: {
		fontSize: string;
		padding: string;
		borderRadius: string;
		border?: string;
		borderBottom?: boolean;
		isOutline?: boolean;
		fontWeight?: string;
		textTransform?: string;
	},
}

export default function (): StyleInterface[] {
	return [
		{
			id: 'mint',
			headingFont: 'Syne',
			baseFont: 'Inter',
			accent1: '#008080',
			accent2: '#319993',
			contrast1: '#000000',
			contrast2: '#1F1B1C',
			contrast3: '#3E3638',
			contrast4: '#6B6365',
			base1: '#C5E6CC',
			base2: '#DDF2D5',
			base3: '#F6FFDF',
			buttonStyles: {
				fontSize: '16px',
				padding: '16px',
				borderRadius: '0'
			},
			baseFontStyles: {
				size: '18px',
				lineHeight: '1.3',
				letterSpacing: '0px',
				fontWeight: '500',
			},
			h1: {
				size: '80px',
				lineHeight: '1',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h2: {
				size: '72px',
				lineHeight: '1.1',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h3: {
				size: '56px',
				lineHeight: '1.1',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h4: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h5: {
				size: '40px',
				lineHeight: '1.3',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h6: {
				size: '32px',
				lineHeight: '1',
				letterSpacing: '0px',
				fontWeight: '500',
			},
		},
		{
			id: 'royal',
			headingFont: 'Lexend',
			baseFont: 'Lexend',
			accent1: '#480CA6',
			accent2: '#5533B4',
			contrast1: '#042048',
			contrast2: '#113158',
			contrast3: '#1E4369',
			contrast4: '#2B5378',
			base1: '#B7DBEC',
			base2: '#D1ECF9',
			base3: '#EDF9FE',
			buttonStyles: {
				fontSize: '16px',
				padding: '26px 36px',
				borderRadius: '20px'
			},
			baseFontStyles: {
				size: '18px',
				lineHeight: '1.3',
				letterSpacing: '0px',
				fontWeight: '300',
			},
			h1: {
				size: '72px',
				lineHeight: '1',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h2: {
				size: '64px',
				lineHeight: '1',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h3: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h4: {
				size: '48px',
				lineHeight: '1,2',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h5: {
				size: '40px',
				lineHeight: '1.3',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h6: {
				size: '32px',
				lineHeight: '1',
				letterSpacing: '-1px',
				fontWeight: '500',
			},
		},
		{
			id: 'reddish',
			headingFont: 'Bebas Neue',
			baseFont: 'Work Sans',
			accent1: '#E8312E',
			accent2: '#D12C29',
			contrast1: '#000000',
			contrast2: '#170505',
			contrast3: '#2E0A09',
			contrast4: '#450F0E',
			base1: '#FEFBF5',
			base2: '#FEFBF5',
			base3: '#FFFFFF',
			textTransform: 'uppercase',
			buttonStyles: {
				fontSize: '20px',
				padding: '20px 24px',
				borderRadius: '16px',
				border: '2px',
				isOutline: true,
			},
			baseFontStyles: {
				size: '20px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h1: {
				size: '96px',
				lineHeight: '1.1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h2: {
				size: '80px',
				lineHeight: '1.1',
				letterSpacing: '0px',
				fontWeight: '400',
			},
			h3: {
				size: '72px',
				lineHeight: '1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h4: {
				size: '58px',
				lineHeight: '1',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h5: {
				size: '48px',
				lineHeight: '1',
				letterSpacing: '0px',
				fontWeight: '400',
			},
			h6: {
				size: '42px',
				lineHeight: '.9',
				letterSpacing: '0px',
				fontWeight: '400',
			},
		},
		{
			id: 'grotesque',
			headingFont: 'Poppins',
			baseFont: 'Quicksand',
			accent1: '#F07167',
			accent2: '#00AFB9',
			contrast1: '#203C50',
			contrast2: '#284B63',
			contrast3: '#356383',
			contrast4: '#4EA6C1',
			base1: '#EEF2F5',
			base2: '#F8F9FD',
			base3: '#FFFFFF',
			buttonStyles: {
				fontSize: '18px',
				fontWeight: '700',
				padding: '16px',
				borderRadius: '0',
				borderBottom: true,
				border: '2px',
				isOutline: true,
			},
			baseFontStyles: {
				size: '18px',
				lineHeight: '1.4',
				letterSpacing: '0px',
				fontWeight: '500',
			},
			h1: {
				size: '72px',
				lineHeight: '1.1',
				letterSpacing: '-3px',
				fontWeight: '700',
			},
			h2: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '700',
			},
			h3: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '700',
			},
			h4: {
				size: '40px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '700',
			},
			h5: {
				size: '32px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '700',
			},
			h6: {
				size: '24px',
				lineHeight: '1.1',
				letterSpacing: '-1px',
				fontWeight: '700',
			},
		},
		{
			id: 'wintermint',
			headingFont: 'Libre Baskerville',
			baseFont: 'Inter',
			accent1: '#1E1E1E',
			accent2: '#52565D',
			contrast1: '#065045',
			contrast2: '#0B7C6B',
			contrast3: '#0CA38C',
			contrast4: '#1CBCA4',
			base1: '#E8D2BB',
			base2: '#E8E2DB',
			base3: '#F2E7DF',
			buttonStyles: {
				fontSize: '16px',
				fontWeight: '400',
				padding: '26px 36px',
				borderRadius: '4px',
				textTransform: 'uppercase'
			},
			baseFontStyles: {
				size: '24px',
				lineHeight: '1.3',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h1: {
				size: '88px',
				lineHeight: '88px',
				letterSpacing: '-6px',
				fontWeight: '400',
			},
			h2: {
				size: '72px',
				lineHeight: '1.1',
				letterSpacing: '-3px',
				fontWeight: '400',
			},
			h3: {
				size: '64px',
				lineHeight: '72px',
				letterSpacing: '-3px',
				fontWeight: '400',
			},
			h4: {
				size: '53px',
				lineHeight: '1.1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h5: {
				size: '48px',
				lineHeight: '1.1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h6: {
				size: '40px',
				lineHeight: '1.05',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
		},
		{
			id: 'gloomy',
			headingFont: 'DM Serif Display',
			baseFont: 'Roboto',
			accent1: '#FFA500',
			accent2: '#EB990E',
			contrast1: '#36248D',
			contrast2: '#4A307F',
			contrast3: '#5E3E71',
			contrast4: '#724A63',
			base1: '#EEF2F5',
			base2: '#F8F9FD',
			base3: '#FFFFFF',
			buttonStyles: {
				fontSize: '16px',
				fontWeight: '700',
				padding: '16px 32px',
				borderRadius: '40px'
			},
			baseFontStyles: {
				size: '18px',
				lineHeight: '1.2',
				letterSpacing: '0px',
				fontWeight: '400',
			},
			h1: {
				size: '74px',
				lineHeight: '0.9',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h2: {
				size: '64px',
				lineHeight: '1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h3: {
				size: '56px',
				lineHeight: '1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h4: {
				size: '48px',
				lineHeight: '1.1',
				letterSpacing: '-2px',
				fontWeight: '400',
			},
			h5: {
				size: '40px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h6: {
				size: '32px',
				lineHeight: '1',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
		},
		{
			id: 'brightred',
			headingFont: 'Dela Gothic One',
			baseFont: 'Courier Prime',
			accent1: '#FF0000',
			accent2: '#E70101',
			contrast1: '#0F0F0E',
			contrast2: '#0F0F0E',
			contrast3: '#270E0D',
			contrast4: '#3F0C0B',
			base1: '#E5E5E5',
			base2: '#ECEBE8',
			base3: '#F5F3EE',
			buttonStyles: {
				fontSize: '16px',
				fontWeight: '400',
				padding: '16px 26px',
				borderRadius: '0px'
			},
			baseFontStyles: {
				size: '18px',
				lineHeight: '1.3',
				letterSpacing: '0px',
				fontWeight: '400',
			},
			h1: {
				size: '72px',
				lineHeight: '1',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h2: {
				size: '64px',
				lineHeight: '1',
				letterSpacing: '-3px',
				fontWeight: '400',
			},
			h3: {
				size: '56px',
				lineHeight: '1',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h4: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h5: {
				size: '40px',
				lineHeight: '1.1',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
			h6: {
				size: '32px',
				lineHeight: '1',
				letterSpacing: '-1px',
				fontWeight: '400',
			},
		},
		{
			id: 'orange',
			headingFont: 'Hepta Slab',
			baseFont: 'Space Grotesk',
			accent1: '#E56E2A',
			accent2: '#C55B1E',
			contrast1: '#040A19',
			contrast2: '#0E1B3D',
			contrast3: '#182B5B',
			contrast4: '#284385',
			base1: '#FFFFFF',
			base2: '#FDFEFC',
			base3: '#F1F5EE',
			buttonStyles: {
				fontSize: '16px',
				fontWeight: '400',
				padding: '26px 36px',
				borderRadius: '8px'
			},
			baseFontStyles: {
				size: '18px',
				lineHeight: '1.3',
				letterSpacing: '0px',
				fontWeight: '400',
			},
			h1: {
				size: '72px',
				lineHeight: '1.2',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h2: {
				size: '64px',
				lineHeight: '1.3',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h3: {
				size: '56px',
				lineHeight: '1.4',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h4: {
				size: '48px',
				lineHeight: '1.3',
				letterSpacing: '-3px',
				fontWeight: '500',
			},
			h5: {
				size: '40px',
				lineHeight: '1.2',
				letterSpacing: '-2px',
				fontWeight: '500',
			},
			h6: {
				size: '32px',
				lineHeight: '1.2',
				letterSpacing: '-1px',
				fontWeight: '500',
			},
		},
	];
}
