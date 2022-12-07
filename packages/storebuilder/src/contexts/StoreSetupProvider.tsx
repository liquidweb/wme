import { createContext, useState } from '@wordpress/element';
import { beforeUnloadListener, removeNulls, handleActionRequest } from '@moderntribe/wme-utils';
import { __ } from '@wordpress/i18n';

import StoreSetupScreenData, {
	StoreSetupScreenDataInterface,
	StoreSetupFormItemsInterface,
	RegionInterface,
	StateInterface,
	LocalesInterface
} from '@setup/data/store-setup-screen-data';

import { STOREBUILDER_URL } from '@store/constants';
import { StoreSetupStringData } from '@setup/data/constants';
import { useWizard } from '@store/hooks';

export interface WooCommerceStateObjectInterface {
	code: string;
	name: string;
}

export interface WooCommerceRegionResponseInterface {
	code: string;
	name: string;
	states: WooCommerceStateObjectInterface[];
}

export interface StoreSetupProviderContextInterface {
	storeSetupState: StoreSetupScreenDataInterface;
	setStateAndFormValue: (prop: keyof StoreSetupFormItemsInterface, value: string, touched?: boolean) => void;
	setFormValue: (prop: keyof StoreSetupFormItemsInterface, value: string) => void;
	submitForm: () => void;
	isScreenTouched: () => boolean;
	resetFormValues: () => void;
	setIsLoading: (isLoading: boolean) => void;
	getRegions: () => RegionInterface[];
	setRegion: (region: string) => void;
	getSelectedRegion: () => RegionInterface[];
	getStates: () => StateInterface[];
	getSelectedState: () => StateInterface[];
	getLocales: () => LocalesInterface;
	getCurrentLocale: () => string;
	getLocaleByRegion: (region: string) => string;
	setCurrency: (currency: string) => void;
	setProductTypes: (types: string[]) => void;
	setProductCount: (count: string) => void;
}

const locationScreenFormProps = ['addressLineOne', 'addressLineTwo', 'region', 'state', 'city', 'postCode'];
const storeDetailsScreenFormProps = ['currency', 'productTypes', 'productCount'];

const storeSetupData = StoreSetupScreenData();
const { submitForm: submitFormContent } = StoreSetupStringData;

export const StoreSetupContext = createContext<
	StoreSetupProviderContextInterface | StoreSetupScreenDataInterface | null
>(storeSetupData);

const StoreSetupProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [storeSetupState, setStoreSetupState] = useState<StoreSetupScreenDataInterface>(storeSetupData);
	const { currentStep } = useWizard();

	const submitForm = () => {
		function handleError() {
			// eslint-disable-next-line no-alert
			alert(submitFormContent.errorMessage);
		}

		const formValues = storeSetupState.form;
		const data = removeNulls({
			_wpnonce: storeSetupState?.ajax?.nonce ? storeSetupState.ajax.nonce : '',
			action: storeSetupState?.ajax?.action ? storeSetupState.ajax.action : '',
			sub_action: 'finish',
			addressLineOne: formValues.addressLineOne.touched ? formValues.addressLineOne.value : null,
			addressLineTwo: formValues.addressLineTwo.touched ? formValues.addressLineTwo.value : null,
			region: formValues.region.touched ? formValues.region.value : null,
			state: formValues.state.touched ? formValues.state.value : null,
			city: formValues.city.touched ? formValues.city.value : null,
			postCode: formValues.postCode.touched ? formValues.postCode.value : null,
			currency: formValues.currency.touched ? formValues.currency.value : null,
			productTypes: formValues.productTypes.touched ? formValues.productTypes.value : null,
			productCount: formValues.productCount.touched ? formValues.productCount.value : null,
		});

		handleActionRequest(data).then(() => {
			removeEventListener('beforeunload', beforeUnloadListener);
			window.location.assign(`${ STOREBUILDER_URL }`);
		}).catch(() => handleError());
	};

	const setStateAndFormValue = (prop: keyof StoreSetupFormItemsInterface, value: string, touched?: boolean) => {
		const formData = storeSetupState.form;
		formData[ prop ].value = value;
		formData[ prop ].touched = typeof touched === 'boolean' ? touched : true;

		setStoreSetupState({
			...storeSetupState,
			[ prop ]: value,
			form: formData
		});
	};

	const setFormValue = (
		prop: keyof StoreSetupFormItemsInterface,
		value: string,
		touched: boolean = true
	) => {
		if (storeSetupState.form[ prop ].value === value) {
			return;
		}

		const formData = storeSetupState.form;
		formData[ prop ].value = value;
		formData[ prop ].touched = touched;

		setStoreSetupState({
			...storeSetupState,
			form: formData
		});
	};

	const resetFormValue = (prop: keyof StoreSetupFormItemsInterface) => {
		const formData = storeSetupState.form;
		formData[ prop ].touched = false;

		// If reseting Region or State, reset the form values with the storeSetupState values.
		if (prop === 'region' || prop === 'state') {
			formData[ prop ].value = storeSetupState[ prop ];
		} else {
			formData[ prop ].value = Array.isArray(formData[ prop ].value) ? [] : '';
		}

		setStoreSetupState({
			...storeSetupState,
			form: formData
		});
	};

	const isScreenTouched = (): boolean => {
		const { form } = storeSetupState;
		let fields: string[] = [];

		switch (currentStep) {
		case 1:
			fields = locationScreenFormProps;
			break;
		case 2:
			fields = storeDetailsScreenFormProps;
			break;
		}

		const matches = fields.filter((property) => form[ property as keyof StoreSetupFormItemsInterface ].touched);

		return matches.length > 0;
	};

	const resetFormValues = () => {
		switch (currentStep) {
		case 1:
			return locationScreenFormProps.map((property) => resetFormValue(property as keyof StoreSetupFormItemsInterface));
		case 2:
			return storeDetailsScreenFormProps.map((property) => resetFormValue(property as keyof StoreSetupFormItemsInterface));
		}
	};

	const setIsLoading = (isLoading: boolean) => {
		setStoreSetupState({
			...storeSetupState,
			isLoading
		});
	};

	const getRegions = () => {
		return storeSetupState?.regions;
	};

	const setRegion = (region: string) => {
		if (region === storeSetupState.form.region.value) {
			return;
		}

		setIsLoading(true);
		window.wp.apiRequest({ path: `/wc/v3/data/countries/${ region }` })
			.then((data: WooCommerceRegionResponseInterface) => {
				const { form, ...rest } = storeSetupState;
				const locale = getLocaleByRegion(region);

				let states: StateInterface[] = [];

				if (data.states && data.states.length > 0) {
					states = data.states.map((state: WooCommerceStateObjectInterface) => ({
						value: state.code,
						label: state.name
					}));
				}

				setStoreSetupState({
					...rest,
					form: Object.assign({}, form, { region: { value: region, touched: true }, state: { value: '' } }),
					isLoading: false,
					region,
					states,
					locale,
				});
			});
	};

	const getStates = () => {
		return storeSetupState?.states;
	};

	const getSelectedState = () => {
		const states = getStates();

		if (! states || states.length === 0) {
			return [] as StateInterface[];
		}

		if (states && ! storeSetupState.form.state.value) {
			return [states[ 0 ]];
		}

		return states?.filter((item: StateInterface) => item.value === storeSetupState.form.state.value);
	};

	const getLocales = () => {
		return storeSetupState?.locales;
	};

	const getCurrentLocale = () => {
		const { locale } = storeSetupState;

		return locale;
	};

	const getLocaleByRegion = (region: string) => {
		const locales = getLocales();
		const locale = locales && typeof region === 'string' && region in locales && (locales as LocalesInterface)[ region ];

		return locale && locale?.state?.label ? locale.state.label	: __('State', 'nexcess-mapps');
	};

	const getSelectedRegion = () => {
		const regions = getRegions();

		if (! regions || regions.length === 0) {
			return [] as RegionInterface[];
		}

		if (regions && ! storeSetupState.form.region.value) {
			return [regions[ 0 ]];
		}

		return regions?.filter((item) => item.value === storeSetupState.form.region.value);
	};

	const setCurrency = (currency: string) => {
		const formData = storeSetupState.form;
		formData.currency.value = currency;
		formData.currency.touched = true;

		setStoreSetupState({
			...storeSetupState,
			currency,
			form: formData
		});
	};

	const setProductTypes = (types: string[]) => {
		const formData = storeSetupState.form;
		formData.productTypes.value = types;
		formData.productTypes.touched = true;

		setStoreSetupState({
			...storeSetupState,
			productTypes: types
		});
	};

	const setProductCount = (count: string) => {
		const formData = storeSetupState.form;
		formData.productCount.value = count;
		formData.productCount.touched = true;

		setStoreSetupState({
			...storeSetupState,
			productCount: count
		});
	};

	return (
		<StoreSetupContext.Provider
			value={ {
				storeSetupState,
				setStateAndFormValue,
				setFormValue,
				submitForm,
				isScreenTouched,
				resetFormValues,
				setIsLoading,
				getRegions,
				setRegion,
				getSelectedRegion,
				getStates,
				getSelectedState,
				getLocales,
				getLocaleByRegion,
				getCurrentLocale,
				setCurrency,
				setProductTypes,
				setProductCount
			} }
		>
			{ children }
		</StoreSetupContext.Provider>
	);
};

export default StoreSetupProvider;
