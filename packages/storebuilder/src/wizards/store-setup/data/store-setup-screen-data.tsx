import React from 'react';
import { __ } from '@wordpress/i18n';

import { StoreLocation, StoreDetails, Complete } from '../screens';

type KeysOfUnion<T> = T extends T ? keyof T: never;

export interface CurrencyInterface {
	[key: string]: string;
}

export interface StateInterface {
	label: string;
	value: string;
}

export interface RegionInterface extends StateInterface {
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
	addressLine1: string;
	addressLine2: string;
	region: string;
	state: string;
	city: string;
	postCode: string;
	locale: string;
	currency: string;
	productsType: string[];
	productCount: string;
	currencies: CurrencyInterface[];
	locales: LocalesInterface;
	regions: RegionInterface[];
	states: StateInterface[];
	ajax: SiteBuilderAjaxObject;
}

export interface StoreSetupFormValueInterface {
	value: string;
	touched: boolean;
	isValid: boolean;
}

export interface StoreSetupStepInterface {
	id: number;
	hideBack?: boolean;
	hideSkip?: boolean;
	hideNext?: boolean;
	label?: string;
	nextText?: string;
	hidePagination?: boolean;
	screen?: React.ReactNode;
	disableNext?: boolean;
	disableAll?: boolean;
	disable?: boolean;
}

export interface StoreSetupFormItemsInterface {
	addressLine1: StoreSetupFormValueInterface;
	addressLine2: StoreSetupFormValueInterface;
	region: StoreSetupFormValueInterface;
	state: StoreSetupFormValueInterface;
	city: StoreSetupFormValueInterface;
	postCode: StoreSetupFormValueInterface;
	currency: StoreSetupFormValueInterface;
	productsType: StoreSetupFormValueInterface;
	productCount: StoreSetupFormValueInterface;
}

export type StoreSetupFormKeysType = keyof StoreSetupFormItemsInterface;

export interface StoreSetupScreenDataInterface extends StoreSetupWizardObjectInterface {
	isLoading: boolean;
	lastStep: number;
	steps: Array<StoreSetupStepInterface>;
	form: StoreSetupFormItemsInterface;
}

export interface StoreSetupServerDataInterface {

}

const stepsData: Array<StoreSetupStepInterface> = [
	{
		id: 0,
		label: __('Location', 'nexcess-mapps'),
		hideSkip: true,
		nextText: __('Next', 'nexcess-mapps'),
		screen: <StoreLocation />
	},
	{
		id: 1,
		label: __('Your Store', 'nexcess-mapps'),
		hideSkip: true,
		nextText: __('Next', 'nexcess-mapps'),
		screen: <StoreDetails />
	},
	{
		id: 2,
		label: __('Complete', 'nexcess-mapps'),
		hideSkip: true,
		hidePagination: true,
		nextText: __('Save & Exit Setup', 'nexcess-mapps'),
		screen: <Complete />
	}
];

const formItemsData: StoreSetupFormItemsInterface = {
	addressLine1: {
		value: '',
		touched: false,
		isValid: true
	},
	addressLine2: {
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
	productsType: {
		value: '',
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
	addressLine1: '',
	addressLine2: '',
	region: '',
	state: '',
	city: '',
	postCode: '',
	locale: '',
	currency: '',
	productsType: [],
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
	const serverData = window?.sitebuilder?.wizards.store_setup;
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
