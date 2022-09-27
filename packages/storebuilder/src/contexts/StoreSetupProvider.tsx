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

export interface StoreSetupProviderContextInterface {
	setupState: StoreSetupScreenDataInterface;
	setFormValue: (prop: keyof StoreSetupFormItemsInterface, value: string) => void;
	submitForm: (isNextLookAndFeel?: boolean) => void;
	resetFormValue: (prop: keyof StoreSetupFormItemsInterface) => void;
	setIsLoading: (isLoading: boolean) => void;
	getRegions: () => RegionInterface[];
	setRegion: (region: string) => void;
	getSelectedRegion: () => RegionInterface | [];
	getStates: () => StateInterface[];
	getSelectedState: () => StateInterface | [];
	getLocales: () => LocalesInterface[];
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
	const [setupState, setStoreSetupState] = useState<StoreSetupScreenDataInterface>(ftcData);
	const { setHideExit } = useWizard();

	useEffect(() => {
		if (! setupState.completed) {
			setHideExit(true);
		}
	}, []);

	const submitForm = (isNextLookAndFeel: boolean = false) => {
		function handleError() {
			// eslint-disable-next-line no-alert
			alert(submitFormContent.errorMessage);
		}

		const formValues = setupState.form;
		const data = removeNulls({
			_wpnonce: setupState?.ajax?.nonce ? setupState.ajax.nonce : '',
			action: setupState?.ajax?.action ? setupState.ajax.action : '',
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
		if (setupState.form[ prop ].value === value) {
			return;
		}

		const formData = setupState.form;
		formData[ prop ].value = value;
		formData[ prop ].touched = touched;
		setStoreSetupState({
			...setupState,
			form: formData
		});
	};

	const resetFormValue = (prop: keyof StoreSetupFormItemsInterface) => {
		const formData = setupState.form;
		formData[ prop ].value = '';
		formData[ prop ].touched = false;

		setStoreSetupState({
			...setupState,
			form: formData
		});
	};

	const setIsLoading = (isLoading: boolean) => {
		setStoreSetupState({
			...setupState,
			isLoading
		});
	};

	const getRegions = () => {
		return setupState?.values?.regions;
	};

	const setRegion = (region: string) => {
		if (region === setupState.form.region.value) {
			return;
		}

		setIsLoading(true);
		window.wp.apiRequest({ path: `/wc/v3/data/countries/${ region }` }).then((data) => {
			const { values, form, ...rest } = setupState;
			const locale = getLocaleByRegion(region);
			let states = [];

			if (data.states && data.states.length > 0) {
				states = data.states.map((state) => ({
					value: state.code,
					label: state.name
				}));
			}

			setStoreSetupState({
				...rest,
				form: Object.assign({}, form, { region: { value: region, isTouched: true }, state: { value: '' } }),
				isLoading: false,
				values: Object.assign({}, values, { states, locale })
			});
		});
	};

	const getStates = () => {
		return setupState?.values?.states;
	};

	const getSelectedState = () => {
		const states = getStates();

		if (! states || states.length === 0) {
			return [];
		}

		if (states && ! setupState.form.state.value) {
			return [states[ 0 ]];
		}

		return states?.filter((item) => item.value === setupState.form.state.value);
	};

	const getLocales = () => {
		return setupState?.values?.locales;
	};

	const getCurrentLocale = () => {
		const { values: { locale } } = setupState;

		return locale;
	};

	const getLocaleByRegion = (region: keyof ) => {
		const locales = getLocales();
		const locale = locales && region in locales && locales[ region ];

		return (typeof locale === 'object' && 'label' in locale.state) ? locale.state.label : __('State', 'nexcess-mapps');
	};

	const getSelectedRegion = () => {
		const regions = getRegions();

		if (! regions || regions.length === 0) {
			return [];
		}

		if (regions && ! setupState.form.region.value) {
			return [regions[ 0 ]];
		}

		return regions?.filter((item) => item.value === setupState.form.region.value);
	};

	return (
		<StoreSetupContext.Provider
			value={ {
				setupState,
				setFormValue,
				submitForm,
				resetFormValue,
				setIsLoading,
				getRegions,
				setRegion,
				getSelectedRegion,
				getStates,
				getSelectedState,
				getCurrentLocale
			} }
		>
			{ children }
		</StoreSetupContext.Provider>
	);
};

export default StoreSetupProvider;
