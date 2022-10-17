import React, { createContext, useState, useEffect } from 'react';
import { beforeUnloadListener, removeNulls } from '@moderntribe/wme-utils';
import { useWizard } from '@sb/hooks';
import { handleActionRequest } from '@sb/utils';

import FtcScreenData, {
	FtcScreenDataInterface,
	FtcFormItemsInterface
} from '@ftc/data/first-time-configuration-screen-data';

import { SITEBUILDER_URL } from '@sb/constants';
import { FtcStringData } from '@ftc/data/constants';

export interface FtcProviderContextInterface {
	ftcState: FtcScreenDataInterface;
	setFormValue: (prop: keyof FtcFormItemsInterface, value: string) => void;
	submitForm: (isNextLookAndFeel?: boolean) => void;
	resetFormValue: (prop: keyof FtcFormItemsInterface) => void;
	setIsLoading: (isLoading: boolean) => void;
	setLogoValue: (id: string, url: string) => void;
	validateUsernamePassword: (
		usernameIsValid: boolean,
		passwordIsValid: boolean
	) => void;
}

export interface FtcUsernamePasswordInterface {
	username: string | null;
	password: string | null;
}

const ftcData = FtcScreenData();
const { submitForm: submitFormContent } = FtcStringData;

export const FirstTimeConfigurationContext = createContext<
	FtcProviderContextInterface | FtcScreenDataInterface | null
>(ftcData);

const FirstTimeConfigurationProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [ftcState, setFtcState] = useState<FtcScreenDataInterface>(ftcData);
	const { setHideExit } = useWizard();

	useEffect(() => {
		if (! ftcState.completed) {
			setHideExit(true);
		}
	}, []);

	const submitForm = (isNextLookAndFeel: boolean = false) => {
		function handleError() {
			// eslint-disable-next-line no-alert
			alert(submitFormContent.errorMessage);
		}

		const formValues = ftcState.form;
		const data = removeNulls({
			_wpnonce: ftcState?.ajax?.nonce ? ftcState.ajax.nonce : '',
			action: ftcState?.ajax?.action ? ftcState.ajax.action : '',
			sub_action: 'finish',
			logo: formValues.logoId.touched ? formValues.logoId.value : null,
			siteName: formValues.siteName.touched ? formValues.siteName.value : null,
			tagLine: formValues.tagline.touched ? formValues.tagline.value : null,
			username: ! ftcState.completed && formValues.username.touched ? formValues.username.value : null,
			password: formValues.password.touched ? formValues.password.value : null,
		});

		handleActionRequest(data).then(() => {
			removeEventListener('beforeunload', beforeUnloadListener);
			const navigateTo = isNextLookAndFeel ? '#/wizard/look-and-feel' : '';
			window.location.assign(`${ SITEBUILDER_URL }${ navigateTo }`);
		}).catch(() => handleError());
	};

	const setFormValue = (
		prop: keyof FtcFormItemsInterface,
		value: string,
		touched: boolean = true
	) => {
		if (ftcState.form[ prop ].value === value) {
			return;
		}

		const formData = ftcState.form;
		formData[ prop ].value = value;
		formData[ prop ].touched = touched;
		setFtcState({
			...ftcState,
			form: formData
		});
	};

	const resetFormValue = (prop: keyof FtcFormItemsInterface) => {
		const formData = ftcState.form;
		formData[ prop ].value = '';
		formData[ prop ].touched = false;

		setFtcState({
			...ftcState,
			form: formData
		});
	};

	const setIsLoading = (isLoading: boolean) => {
		setFtcState({
			...ftcState,
			isLoading
		});
	};

	const validateUsernamePassword = (
		usernameIsValid: boolean,
		passwordIsValid: boolean
	) => {
		const { steps, form, completed } = ftcState;
		form.username.isValid = usernameIsValid;
		form.password.isValid = passwordIsValid;

		if (! completed) {
			steps[ 1 ].disableNext = ! usernameIsValid || ! passwordIsValid;
		} else {
			steps[ 1 ].disableNext = !! (form.password.value && ! passwordIsValid);
		}

		setFtcState({
			...ftcState,
			steps
		});
	};

	const setLogoValue = (id: string, url: string) => {
		const { previewLogo } = ftcState;
		previewLogo.id = id;
		previewLogo.url = url;

		setFtcState({
			...ftcState,
			previewLogo
		});
	};

	return (
		<FirstTimeConfigurationContext.Provider
			value={ {
				ftcState,
				setFormValue,
				submitForm,
				resetFormValue,
				setIsLoading,
				setLogoValue,
				validateUsernamePassword
			} }
		>
			{ children }
		</FirstTimeConfigurationContext.Provider>
	);
};

export default FirstTimeConfigurationProvider;
