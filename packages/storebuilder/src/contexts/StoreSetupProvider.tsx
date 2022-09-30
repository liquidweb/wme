import React, { createContext, useState, useEffect } from 'react';
import { useWizard } from '@store/hooks';
import { beforeUnloadListener, removeNulls, handleActionRequest } from '@store/utils';
import { __ } from '@wordpress/i18n';

import StoreSetupScreenData, {
	StoreSetupScreenDataInterface,
	StoreSetupFormItemsInterface,
	RegionInterface,
	StateInterface,
	LocalesInterface
} from '@setup/data/store-setup-screen-data';

import { SITEBUILDER_URL } from '@store/constants';
import { StoreSetupStringData } from '@setup/data/constants';

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
	setFormValue: (prop: keyof StoreSetupFormItemsInterface, value: string) => void;
	submitForm: (isNextLookAndFeel?: boolean) => void;
	resetFormValue: (prop: keyof StoreSetupFormItemsInterface) => void;
	setIsLoading: (isLoading: boolean) => void;
	getRegions: () => RegionInterface[];
	setRegion: (region: string) => void;
	getSelectedRegion: () => RegionInterface[];
	getStates: () => StateInterface[];
	getSelectedState: () => StateInterface[];
	getLocales: () => LocalesInterface;
	getCurrentLocale: () => string;
	getLocaleByRegion: (region: string) => string;
}

const ftcData = StoreSetupScreenData();
// @todo: Decide on window object manipulation.
// const wizardWindowObject = window?.sitebuilder?.wizards?.ftc;
const { submitForm: submitFormContent } = StoreSetupStringData;

export const StoreSetupContext = createContext<
	StoreSetupProviderContextInterface | StoreSetupScreenDataInterface | null
>(ftcData);

const StoreSetupProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [storeSetupState, setStoreSetupState] = useState<StoreSetupScreenDataInterface>(ftcData);
	const { setHideExit } = useWizard();

	useEffect(() => {
		if (! storeSetupState.completed) {
			setHideExit(true);
		}
	}, []);

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
			addressLine1: formValues.addressLine1.touched ? formValues.addressLine1.value : null,
			addressLine2: formValues.addressLine2.touched ? formValues.addressLine2.value : null,
			region: formValues.region.touched ? formValues.region.value : null,
			state: formValues.state.touched ? formValues.state.value : null,
			city: formValues.city.touched ? formValues.city.value : null,
			postCode: formValues.postCode.touched ? formValues.postCode.value : null,
			currency: formValues.currency.touched ? formValues.currency.value : null,
			productsType: formValues.productsType.touched ? formValues.productsType.value : null,
			productCount: formValues.productCount.touched ? formValues.productCount.value : null,
		});

		// @todo: This will likely have to be changed.
		handleActionRequest(data).then(() => {
			removeEventListener('beforeunload', beforeUnloadListener);
			window.location.assign(`${ SITEBUILDER_URL }`);
		}).catch(() => handleError());
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
		formData[ prop ].value = '';
		formData[ prop ].touched = false;

		setStoreSetupState({
			...storeSetupState,
			form: formData
		});
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
					form: Object.assign({}, form, { region: { value: region, isTouched: true }, state: { value: '' } }),
					isLoading: false,
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

	return (
		<StoreSetupContext.Provider
			value={ {
				storeSetupState,
				setFormValue,
				submitForm,
				resetFormValue,
				setIsLoading,
				getRegions,
				setRegion,
				getSelectedRegion,
				getStates,
				getSelectedState,
				getLocales,
				getLocaleByRegion,
				getCurrentLocale
			} }
		>
			{ children }
		</StoreSetupContext.Provider>
	);
};

export default StoreSetupProvider;
