
export interface FtcFormValueInterface<T> {
	value: T;
	touched: boolean;
	isValid: boolean;
}

export interface FtcFormItemsInterface {
	username: FtcFormValueInterface<string>;
	password: FtcFormValueInterface<string>;
	logoId: FtcFormValueInterface<string>;
	siteName: FtcFormValueInterface<string>;

	tagline: FtcFormValueInterface<string>;
	industry: FtcFormValueInterface<string>;
	subIndustry: FtcFormValueInterface<string>;
	siteDescription: FtcFormValueInterface<string>;
	sitePersonality: FtcFormValueInterface<string>;
	siteKeywords: FtcFormValueInterface<string[]>;
	goals: FtcFormValueInterface<string[]>;
	template: FtcFormValueInterface<string>;
	colorPalette: FtcFormValueInterface<string>;
	fontPairing: FtcFormValueInterface<string>;
}

export default {
	username: {
		value: '',
		touched: false,
		isValid: false
	},
	password: {
		value: '',
		touched: false,
		isValid: false
	},
	logoId: {
		value: '',
		touched: false,
		isValid: true
	},
	siteName: {
		value: '',
		touched: false,
		isValid: true
	},
	tagline: {
		value: '',
		touched: false,
		isValid: true
	},
	industry: {
		value: '',
		touched: false,
		isValid: true
	},
	subIndustry: {
		value: '',
		touched: false,
		isValid: true
	},
	siteDescription: {
		value: '',
		touched: false,
		isValid: true
	},
	sitePersonality: {
		value: '',
		touched: false,
		isValid: true
	},
	siteKeywords: {
		value: [],
		touched: false,
		isValid: true
	},
	goals: {
		value: [],
		touched: false,
		isValid: true
	},
	template: {
		value: '',
		touched: false,
		isValid: true
	},
	colorPalette: {
		value: '',
		touched: false,
		isValid: true
	},
	fontPairing: {
		value: '',
		touched: false,
		isValid: false
	}
} as FtcFormItemsInterface;
