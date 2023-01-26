import { createContext, useState } from 'react';
import { beforeUnloadListener, removeNulls, handleActionRequest } from '@moderntribe/wme-utils';

import FtcScreenData, {
	FtcScreenDataInterface,
	FtcFormItemsInterface
} from '@ftc/data/first-time-configuration-screen-data';

import { SITEBUILDER_URL } from '@sb/constants';
import { FtcStringData } from '@ftc/data/constants';

export type setFormValueFn = (prop: keyof FtcFormItemsInterface, value: string | string[]) => void;
export type submitFormFn = (isNextLookAndFeel?: boolean) => void;
export type resetFormValueFn = (prop: keyof FtcFormItemsInterface) => void;
export type setIsLoadingFn = (isLoading: boolean) => void;
export type setLogoValueFn = (id: string, url: string) => void;
export type validateUsernamePasswordFn = (usernameIsValid: boolean, passwordIsValid: boolean) => void;
export type shouldAllowNextStepFn = (prop: any | any[], activeStep: number) => void;

export interface FtcProviderContextInterface {
	ftcState: FtcScreenDataInterface;
	setFormValue: setFormValueFn,
	submitForm: submitFormFn;
	resetFormValue: resetFormValueFn;
	setIsLoading:setIsLoadingFn;
	setLogoValue: setLogoValueFn;
	validateUsernamePassword: validateUsernamePasswordFn;
	shouldAllowNextStep:shouldAllowNextStepFn;
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

const FirstTimeConfigurationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
	const [ftcState, setFtcState] = useState<FtcScreenDataInterface>(ftcData);

	const submitForm: submitFormFn = (isNextLookAndFeel = false) => {
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
			// tagLine: formValues.tagline.touched ? formValues.tagline.value : null,
			industry: formValues.industry.touched ? formValues.industry.value : null,
			subIndustry: formValues.subIndustry.touched ? formValues.subIndustry.value : null,
			username: ! ftcState.completed && formValues.username.touched ? formValues.username.value : null,
			password: formValues.password.touched ? formValues.password.value : null,
		});

		handleActionRequest(data).then(() => {
			removeEventListener('beforeunload', beforeUnloadListener);
			const navigateTo = isNextLookAndFeel ? '#/wizard/look-and-feel' : '';
			window.location.assign(`${ SITEBUILDER_URL }${ navigateTo }`);
		}).catch(() => handleError());
	};

	const setFormValue: setFormValueFn = (prop, value, touched = true) => {
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

	const resetFormValue: resetFormValueFn = (prop) => {
		const formData = ftcState.form;
		formData[ prop ].value = '';
		formData[ prop ].touched = false;

		setFtcState({
			...ftcState,
			form: formData
		});
	};

	const setIsLoading: setIsLoadingFn = (isLoading) => {
		setFtcState({
			...ftcState,
			isLoading
		});
	};

	const shouldAllowNextStep: shouldAllowNextStepFn = (criteria, activeStep) => {
		const { steps } = ftcState;
		steps[ activeStep ].disableNext = criteria;
		setFtcState({
			...ftcState,
			steps
		});
	};

	const validateUsernamePassword: validateUsernamePasswordFn = (usernameIsValid, passwordIsValid) => {
		const { form, completed } = ftcState;
		form.username.isValid = usernameIsValid;
		form.password.isValid = passwordIsValid;

		if (! completed) {
			shouldAllowNextStep(! usernameIsValid || ! passwordIsValid, 0);
		} else {
			shouldAllowNextStep(!! (form.password.value && ! passwordIsValid), 0);
		}
	};

	const setLogoValue: setLogoValueFn = (id, url) => {
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
				validateUsernamePassword,
				shouldAllowNextStep,
			} }
		>
			{ children }
		</FirstTimeConfigurationContext.Provider>
	);
};

export default FirstTimeConfigurationProvider;
