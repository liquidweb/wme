export type FontDetails = {
	size: string;
	lineHeight: string;
	letterSpacing: string;
}

export interface StyleInterface {
	headingFont: string;
	baseFont: string;
	baseFontStyles: FontDetails;
	borderRadius: string;
	buttonFont: string;
	buttonPadding: string;
	accent1: string;
	accent2: string;
	contrast1: string;
	contrast2: string;
	contrast3: string;
	contrast4: string;
	base1: string;
	base2: string;
	base3: string;
	starterTemplate: string;
	h1: FontDetails;
	h2: FontDetails;
	h3: FontDetails;
	h4: FontDetails;
	h5: FontDetails;
}

export default function (): StyleInterface[] {
	return [
		{
			headingFont: 'DM Serif Display',
			baseFont: 'Roboto',
			borderRadius: '0',
			buttonFont: '1rem',
			buttonPadding: '10px 25px',
			accent1: '#FDB200',
			accent2: '#F8C038',
			contrast1: '#1C1C1C',
			contrast2: '#3A3A3A',
			contrast3: '#626361',
			contrast4: '#7B7B7B',
			base1: '#DCD6B3',
			base2: '#EEE9CF',
			base3: '#FFFFFF',
			starterTemplate: 'Cooking Course (Pro)',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '64px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
			h2: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
			h3: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
		},
		{
			headingFont: 'Prompt',
			baseFont: 'Roboto',
			borderRadius: '20px 0',
			buttonFont: '1.2rem',
			buttonPadding: '13px 40px',
			accent1: '#496858',
			accent2: '#668876',
			contrast1: '#262626',
			contrast2: '#484848',
			contrast3: '#d86813',
			contrast4: '#878787',
			base1: '#e3e8e5',
			base2: '#f6f8f7',
			base3: '#FFFFFF',
			starterTemplate: 'Fall Festival',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
			h2: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
			h3: {
				size: '40px',
				lineHeight: '1.1',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '1px',
			},
		},
		{
			headingFont: 'Montserrat',
			baseFont: 'System Default',
			borderRadius: '100px',
			buttonFont: '1rem',
			buttonPadding: '8px 20px',
			accent1: '#00b2d4',
			accent2: '#0ecaee',
			contrast1: '#003554',
			contrast2: '#3a4952',
			contrast3: '#5a6c76',
			contrast4: '#75868f',
			base1: '#dbedf2',
			base2: '#ebfafc',
			base3: '#FFFFFF',
			starterTemplate: 'Cleaning Service',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '64px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h2: {
				size: '56px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h3: {
				size: '48px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
		},
		{
			headingFont: 'Barlow',
			baseFont: 'Roboto',
			borderRadius: '40px',
			buttonFont: '1.2rem',
			buttonPadding: '12px 35px',
			accent1: '#d2001c',
			accent2: '#b1051c',
			contrast1: '#000000',
			contrast2: '#5a5a5a',
			contrast3: '#808080',
			contrast4: '#718096',
			base1: '#ebe7df',
			base2: '#f7f5ef',
			base3: '#FFFFFF',
			starterTemplate: 'Baking Course',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '64px',
				lineHeight: '1.2',
				letterSpacing: '-0.5px',
			},
			h2: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '-0.5px',
			},
			h3: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '-0.5px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.2',
				letterSpacing: '-0.5px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '-0.5px',
			},
		},
		{
			headingFont: 'Cormorant Garamond',
			baseFont: 'Jost',
			borderRadius: '0',
			buttonFont: '0.8rem',
			buttonPadding: '8px 12px',
			accent1: '#7f834e',
			accent2: '#9a9e5d',
			contrast1: '#262626',
			contrast2: '#595a4a',
			contrast3: '#707166',
			contrast4: '#9a9b8e',
			base1: '#ece8db',
			base2: '#f5f2e7',
			base3: '#FFFFFF',
			starterTemplate: 'Meditation Course',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '62px',
				lineHeight: '1.5',
				letterSpacing: '1px',
			},
			h2: {
				size: '52px',
				lineHeight: '1.5',
				letterSpacing: '1px',
			},
			h3: {
				size: '42px',
				lineHeight: '1.5',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.5',
				letterSpacing: '1px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.5',
				letterSpacing: '1px',
			},
		},
		{
			headingFont: 'Poppins',
			baseFont: 'Open Sans',
			borderRadius: '16px',
			buttonFont: '1rem',
			buttonPadding: '15px 25px',
			accent1: '#9b67e4',
			accent2: '#00c9e8',
			contrast1: '#0d172b',
			contrast2: '#394158',
			contrast3: '#4A5568',
			contrast4: '#718096',
			base1: '#f5f5f5',
			base2: '#F7FAFC',
			base3: '#FFFFFF',
			starterTemplate: 'Podcast',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '56px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h2: {
				size: '48px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h3: {
				size: '40px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.4',
				letterSpacing: '1px',
			},
		},
		{
			headingFont: 'Staatliches',
			baseFont: 'Helvetica, Sans-Serif',
			borderRadius: '16px',
			buttonFont: '1.2rem',
			buttonPadding: '15px 40px',
			accent1: '#f27a4c',
			accent2: '#f7571a',
			contrast1: '#01050e',
			contrast2: '#3f4349',
			contrast3: '#595b5f',
			contrast4: '#747575',
			base1: '#e6e1db',
			base2: '#faf7f0',
			base3: '#FFFFFF',
			starterTemplate: 'BBQ Beer Fest',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
			h2: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '2px',
			},
			h3: {
				size: '40px',
				lineHeight: '1.1',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '0px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
		},
		{
			headingFont: 'Raleway',
			baseFont: 'Raleway',
			borderRadius: '24px 0  24px 0',
			buttonFont: '1.2rem',
			buttonPadding: '25px 40px',
			accent1: '#d71e49',
			accent2: '#b91037',
			contrast1: '#000000',
			contrast2: '#323335',
			contrast3: '#4a4b4d',
			contrast4: '#8d8d8d',
			base1: '#dcddde',
			base2: '#F3F4F8',
			base3: '#FFFFFF',
			starterTemplate: 'Fitness Course',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
			h2: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '2px',
			},
			h3: {
				size: '40px',
				lineHeight: '1.1',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '0px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
		},
		{
			headingFont: 'Dela Gothic One',
			baseFont: 'Roboto',
			borderRadius: '24px',
			buttonFont: '1rem',
			buttonPadding: '8px 24px',
			accent1: '#3dfaff',
			accent2: '#bb00ff',
			contrast1: '#070538',
			contrast2: '#282580',
			contrast3: '#4A5568',
			contrast4: '#696990',
			base1: '#f2f2fa',
			base2: '#f3f3f8',
			base3: '#FFFFFF',
			starterTemplate: 'UR Brand',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
			h2: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '2px',
			},
			h3: {
				size: '40px',
				lineHeight: '1.1',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '0px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
		},
		{
			headingFont: 'Krona One',
			baseFont: 'IBM Plex Sans',
			borderRadius: '0',
			buttonFont: '0.8rem',
			buttonPadding: '10px 14px',
			accent1: '#f8e60c',
			accent2: '#e131ff',
			contrast1: '#1a1a1a',
			contrast2: '#3c3c3c',
			contrast3: '#525252',
			contrast4: '#777777',
			base1: '#eeeeee',
			base2: '#fcfcfc',
			base3: '#FFFFFF',
			starterTemplate: 'SEO Skills',
			baseFontStyles: {
				size: '16px',
				lineHeight: '1.5',
				letterSpacing: '0px',
			},
			h1: {
				size: '56px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
			h2: {
				size: '48px',
				lineHeight: '1.2',
				letterSpacing: '2px',
			},
			h3: {
				size: '40px',
				lineHeight: '1.1',
				letterSpacing: '1px',
			},
			h4: {
				size: '32px',
				lineHeight: '1.4',
				letterSpacing: '0px',
			},
			h5: {
				size: '24px',
				lineHeight: '1.2',
				letterSpacing: '0px',
			},
		},
	];
}
