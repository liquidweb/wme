export interface StyleInterface {
	headingFont: string;
	baseFont: string;
	borderRadius: string;
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
}

export default function (): StyleInterface[] {
	return [
		{
			headingFont: 'DM Serif Display',
			baseFont: 'Roboto',
			borderRadius: '0',
			accent1: '#FDB200',
			accent2: '#F8C038',
			contrast1: '#1C1C1C',
			contrast2: '#3A3A3A',
			contrast3: '#626361',
			contrast4: '#7B7B7B',
			base1: '#DCD6B3',
			base2: '#EEE9CF',
			base3: '#FFFFFF',
			starterTemplate: 'Cooking Course (Pro)'
		},
		{
			headingFont: 'Prompt',
			baseFont: 'Roboto',
			borderRadius: '0',
			accent1: '#496858',
			accent2: '#668876',
			contrast1: '#262626',
			contrast2: '#484848',
			contrast3: '#d86813',
			contrast4: '#878787',
			base1: '#e3e8e5',
			base2: '#f6f8f7',
			base3: '#FFFFFF',
			starterTemplate: 'Fall Festival'
		},
		{
			headingFont: 'Montserrat',
			baseFont: 'System Default',
			borderRadius: '100px',
			accent1: '#00b2d4',
			accent2: '#0ecaee',
			contrast1: '#003554',
			contrast2: '#3a4952',
			contrast3: '#5a6c76',
			contrast4: '#75868f',
			base1: '#dbedf2',
			base2: '#ebfafc',
			base3: '#FFFFFF',
			starterTemplate: 'Cleaning Service'
		}
	]
}
