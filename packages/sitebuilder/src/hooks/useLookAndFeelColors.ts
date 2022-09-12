interface FontsInterface {
	palette: string;
	colors: Array<string>;
}

export function useLookAndFeelColors() {
	const palettes: FontsInterface[] = [
		{
			palette: 'base',
			colors: [
				'#2B6CB0',
				'#3B3B3B',
				'#E1E1E1',
				'#F7F7F7',
				'#ffffff',
			]
		},
		{
			palette: 'orange',
			colors: [
				'#e47b02',
				'#3E4C59',
				'#F3F4F7',
				'#F9F9FB',
				'#ffffff',
			]
		},
		{
			palette: 'pinkish',
			colors: [
				'#E21E51',
				'#032075',
				'#DEDDEB',
				'#EFEFF5',
				'#ffffff',
			]
		},
		{
			palette: 'mint',
			colors: [
				'#2cb1bc',
				'#133453',
				'#e0fcff',
				'#f5f7fa',
				'#ffffff',
			]
		},
		{
			palette: 'green',
			colors: [
				'#049f82',
				'#353535',
				'#EEEEEE',
				'#F7F7F7',
				'#ffffff',
			]
		},
		{
			palette: 'rich',
			colors: [
				'#295CFF',
				'#1C0D5A',
				'#E1EBEE',
				'#EFF7FB',
				'#ffffff',
			]
		},
		{
			palette: 'fem',
			colors: [
				'#D86C97',
				'#282828',
				'#f7dede',
				'#F6F2EF',
				'#ffffff',
			]
		},
		{
			palette: 'teal',
			colors: [
				'#7ACFC4',
				'#000000',
				'#F6E7BC',
				'#F9F7F7',
				'#ffffff',
			]
		},
		{
			palette: 'bold',
			colors: [
				'#000000',
				'#000000',
				'#F6E7BC',
				'#F9F7F7',
				'#ffffff',
			]
		},
		{
			palette: 'hot',
			colors: [
				'#FF5698',
				'#000000',
				'#FDEDEC',
				'#FDF6EE',
				'#ffffff',
			]
		},
		{
			palette: 'darkmode',
			colors: [
				'#3296ff',
				'#F7FAFC',
				'#2D3748',
				'#252C39',
				'#1a202c',
			]
		},
		{
			palette: 'pinkishdark',
			colors: [
				'#E21E51',
				'#EFEFF5',
				'#514D7C',
				'#221E5B',
				'#040037',
			]
		},
	];

	return palettes;
}
