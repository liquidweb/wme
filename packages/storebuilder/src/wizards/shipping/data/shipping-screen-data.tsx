import { __ } from '@wordpress/i18n';
import { AddShippingMethod } from '@shipping/screens';

export type ShippingProviderType = {
	[key: string]: {
		active: boolean;
	}
}

export interface ShippingWizardObjectInterface {
	slug: string;
	providers: ShippingProviderType;
	ajax: StoreBuilderAjaxObject;
}

export interface ShippingScreenDataInterface extends ShippingWizardObjectInterface {
	isLoading: boolean;
	shippingProviders: string[];
	providersActivated: boolean;
	lastStep: number;
	error: boolean;
	steps: Array<StepInterface>;
}

const stepsData: Array<StepInterface> = [
	{
		id: 0,
		label: __('Add A Shipping Method', 'moderntribe-storebuilder'),
		title: __('Add a shipping method', 'moderntribe-storebuilder'),
		description: __('Lets set up the best and preferred shipping method for your physicial products.', 'moderntribe-storebuilder'),
		hideBack: true,
		hideSkip: true,
		disableNext: true,
		screen: <AddShippingMethod />
	}
];

const localData: ShippingScreenDataInterface = {
	isLoading: false,
	lastStep: 1,
	slug: '',
	error: false,
	steps: stepsData,
	providers: {},
	providersActivated: false,
	shippingProviders: [],
	ajax: {
		action: '',
		nonce: '',
		url: ''
	}
};

const ShippingScreenData = (): ShippingScreenDataInterface => {
	const serverData: ShippingWizardObjectInterface = window?.sitebuilder_store_details?.wizards.shipping;

	return Object.assign(
		{},
		localData,
		serverData
	);
};

export default ShippingScreenData;
