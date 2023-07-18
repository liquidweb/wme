import { createContext, useState } from 'react';
import {
	beforeUnloadListener,
	removeNulls,
	handleActionRequest
} from '@moderntribe/wme-utils';

import FtcScreenData, {
	FtcScreenDataInterface
} from '@ftc/data/first-time-configuration-screen-data';
import { FtcFormItemsInterface, FtcFormValueInterface } from '@ftc/data/ftc-form';

import { SITEBUILDER_URL } from '@sb/constants';
import { FtcStringData } from '@ftc/data/constants';
import { useWizard } from '@sb/hooks';

export type setFormValueFn = (
	prop: keyof FtcFormItemsInterface,
	value: string | string[]
) => void;
export type submitFormFn = () => void;
export type resetFormValueFn = (prop: keyof FtcFormItemsInterface) => void;
export type setIsLoadingFn = (isLoading: boolean) => void;
export type setLogoValueFn = (id: string, url: string) => void;
export type validateUsernamePasswordFn = (
	usernameIsValid: boolean,
	passwordIsValid: boolean
) => void;
export type shouldBlockNextStepFn = (
	prop: any | any[]
) => void;
export type cacheKadenceTemplatesFn = (templatesObj: any) => void;

export interface FtcProviderContextInterface {
	ftcState: FtcScreenDataInterface;
	setFormValue: setFormValueFn;
	submitForm: submitFormFn;
	resetFormValue: resetFormValueFn;
	setIsLoading: setIsLoadingFn;
	setLogoValue: setLogoValueFn;
	validateUsernamePassword: validateUsernamePasswordFn;
	shouldBlockNextStep: shouldBlockNextStepFn;
	cacheKadenceTemplates: cacheKadenceTemplatesFn;
	kadenceTemplates: any;
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

const FirstTimeConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [ftcState, setFtcState] = useState<FtcScreenDataInterface>(ftcData);
	const { currentStep } = useWizard();
	const [kadenceTemplates, setTemplates] = useState<any>();

	const parseFormEntry = (formEntry: FtcFormValueInterface<string | string[]>) => {
		if (formEntry.touched && formEntry.value !== undefined) {
			return formEntry.value;
		}
		return null;
	};

	const submitForm: submitFormFn = () => {
		function handleError() {
			// eslint-disable-next-line no-alert
			alert(submitFormContent.errorMessage);
		}

		const valueObject = Object.keys(ftcState.form).reduce((acc, formItemKey: string) => {
			const formItem: FtcFormValueInterface<string | string[]> = ftcState.form[ formItemKey as keyof FtcFormItemsInterface ];

			return {
				...acc,
				[ formItemKey ]: parseFormEntry(formItem)
			};
		}, {});

		const data = removeNulls({
			_wpnonce: ftcState?.ajax?.nonce ? ftcState.ajax.nonce : '',
			action: ftcState?.ajax?.action ? ftcState.ajax.action : '',
			sub_action: 'finish',
			...valueObject
		});

		handleActionRequest(data)
			.then(() => {
				removeEventListener('beforeunload', beforeUnloadListener);
				window.location.assign(SITEBUILDER_URL);
			})
			.catch(() => handleError());
	};

	const setFormValue: setFormValueFn = (prop, value, touched = true) => {
		if (ftcState.form[ prop ].value === value) {
			return;
		}

		const formData = { ...ftcState.form };
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

	const shouldBlockNextStep: shouldBlockNextStepFn = (criteria) => {
		const { steps } = { ...ftcState };
		const stepIndex = currentStep - 1;
		steps[ stepIndex ].disableNext = Boolean(criteria);
		setFtcState({
			...ftcState,
			steps
		});
	};

	const validateUsernamePassword: validateUsernamePasswordFn = (
		usernameIsValid,
		passwordIsValid
	) => {
		const { form, completed } = ftcState;
		form.username.isValid = usernameIsValid;
		form.password.isValid = passwordIsValid;

		if (! completed) {
			shouldBlockNextStep(! usernameIsValid || ! passwordIsValid);
		} else {
			shouldBlockNextStep(!! (form.password.value && ! passwordIsValid));
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
		shouldBlockNextStep(false);
	};

	const cacheKadenceTemplates: cacheKadenceTemplatesFn = (templates) => {
		setTemplates(templates);
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
				shouldBlockNextStep,
				cacheKadenceTemplates,
				kadenceTemplates,
			} }
		>
			{ children }
		</FirstTimeConfigurationContext.Provider>
	);
};

export default FirstTimeConfigurationProvider;
