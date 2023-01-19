import { __ } from '@wordpress/i18n';
import { StoreLocation, StoreDetails, Complete } from '../screens';
import { EditIcon } from '@store/icons';

type KeysOfUnion<T> = T extends T ? keyof T: never;

export interface CurrencyInterface {
	[key: string]: string;
}

export interface LabelValueInterface {
	label: string;
	value: string;
}

export interface StateInterface {
	label: string;
	value: string;
}

export interface RegionInterface extends LabelValueInterface {
	country: string;
}

// @todo: Cleanup this interface. We may only require the label and hidden value, and likely not all these nodes.
export interface LocaleInterface {
	postcode?: {
		label?: string;
		priority?: number;
		required: boolean;
		hidden: boolean;
	};
	state: {
		label?: string;
		required?: boolean;
		hidden?: boolean;
	};
	city?: {
		label?: string;
		required?: boolean;
		hidden?: boolean;
	};
	address_2?: {
		required?: boolean;
		hidden?: boolean;
	}
}

export interface LocalesInterface {
	[key: string]: LocaleInterface;
}

export interface StoreSetupWizardObjectInterface {
	id: string;
	completed: boolean;
	addressLineOne: string;
	addressLineTwo: string;
	region: string;
	state: string;
	city: string;
	postCode: string;
	locale: string;
	currency: string;
	productTypes: string[];
	productCount: string;
	currencies: LabelValueInterface[];
	locales: LocalesInterface;
	regions: RegionInterface[];
	states: StateInterface[];
	ajax: StoreBuilderAjaxObject;
}

export interface StoreSetupFormValueInterface {
	value: string | string[];
	touched: boolean;
	isValid: boolean;
}

export interface StoreSetupFormItemsInterface {
	addressLineOne: StoreSetupFormValueInterface;
	addressLineTwo: StoreSetupFormValueInterface;
	region: StoreSetupFormValueInterface;
	state: StoreSetupFormValueInterface;
	city: StoreSetupFormValueInterface;
	postCode: StoreSetupFormValueInterface;
	currency: StoreSetupFormValueInterface;
	productTypes: StoreSetupFormValueInterface;
	productCount: StoreSetupFormValueInterface;
}

export interface StoreSetupScreenDataInterface extends StoreSetupWizardObjectInterface {
	isLoading: boolean;
	lastStep: number;
	steps: Array<StepInterface>;
	form: StoreSetupFormItemsInterface;
}

const stepsData: Array<StepInterface> = [
	{
		id: 0,
		label: __('Location', 'moderntribe-storebuilder'),
		icon: <EditIcon />,
		title: __('Where\'s your store located?', 'moderntribe-storebuilder'),
		description: __('We need this even if you don\'t have a physical store. Your store address is where you are. We use this to calculate taxes, and we need this for transaction-related emails. It\'s all about being a good store owner.', 'moderntribe-storebuilder'),
		hideBack: true,
		nextText: __('Next', 'moderntribe-storebuilder'),
		screen: <StoreLocation />
	},
	{
		id: 1,
		label: __('Your Store', 'moderntribe-storebuilder'),
		icon: <EditIcon />,
		title: __('About your store', 'moderntribe-storebuilder'),
		description: __('Last step! A few more details about your store.', 'moderntribe-storebuilder'),
		nextText: __('Next', 'moderntribe-storebuilder'),
		screen: <StoreDetails />
	},
	{
		id: 2,
		label: __('Complete', 'moderntribe-storebuilder'),
		hideSkip: true,
		hidePagination: true,
		nextText: __('Save & Exit Setup', 'moderntribe-storebuilder'),
		screen: <Complete />
	}
];

const formItemsData: StoreSetupFormItemsInterface = {
	addressLineOne: {
		value: '',
		touched: false,
		isValid: true
	},
	addressLineTwo: {
		value: '',
		touched: false,
		isValid: true
	},
	region: {
		value: '',
		touched: false,
		isValid: true
	},
	state: {
		value: '',
		touched: false,
		isValid: true
	},
	city: {
		value: '',
		touched: false,
		isValid: true
	},
	postCode: {
		value: '',
		touched: false,
		isValid: true
	},
	currency: {
		value: '',
		touched: false,
		isValid: true
	},
	productTypes: {
		value: [],
		touched: false,
		isValid: true
	},
	productCount: {
		value: '',
		touched: false,
		isValid: true
	}
};

const localData: StoreSetupScreenDataInterface = {
	isLoading: false,
	lastStep: 3,
	steps: stepsData,
	form: formItemsData,
	id: '',
	completed: false,
	addressLineOne: '',
	addressLineTwo: '',
	region: '',
	state: '',
	city: '',
	postCode: '',
	locale: '',
	currency: 'USD',
	productTypes: [],
	productCount: '',
	currencies: [],
	locales: {},
	regions: [],
	states: [],
	ajax: {
		action: '',
		nonce: '',
		url: ''
	},
};

type StoreSetupFormItemsType = KeysOfUnion<StoreSetupFormItemsInterface>;

const setInitialFormValues = (wizardData: StoreSetupWizardObjectInterface): StoreSetupFormItemsInterface => {
	const form = formItemsData;

	Object.keys(formItemsData).forEach((property) => {
		if (property in wizardData) {
			const value = wizardData[ property as StoreSetupFormItemsType ];
			if (typeof value === 'string') {
				form[ property as StoreSetupFormItemsType ].value = value;
			}
		}
	});

	return form;
};

const getStepsData = (disable: boolean) => {
	return stepsData.map((step) => {
		step.disable = disable;
		return step;
	});
};

const StoreSetupScreenData = (): StoreSetupScreenDataInterface => {
	const serverData = window?.sitebuilder_store_details?.wizards.store_setup;
	const { completed } = serverData;
	const formData = serverData
		? setInitialFormValues(serverData)
		: formItemsData;
	const steps = getStepsData(! completed);

	return Object.assign(
		{},
		localData,
		serverData,
		{ steps },
		{ form: formData }
	);
};

export default StoreSetupScreenData;
