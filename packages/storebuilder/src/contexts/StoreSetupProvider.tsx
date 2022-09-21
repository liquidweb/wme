import React, { createContext, useState, useEffect } from 'react';
import { useWizard } from '@store/hooks';
import { beforeUnloadListener, removeNulls, handleActionRequest } from '@store/utils';

import FtcScreenData, {
	FtcScreenDataInterface,
	FtcFormItemsInterface
} from '@setup/data/store-setup-screen-data';

import { SITEBUILDER_URL } from '@store/constants';
import { FtcStringData } from '@setup/data/constants';

export interface FtcProviderContextInterface {
	ftcState: FtcScreenDataInterface;
	setFormValue: (prop: keyof FtcFormItemsInterface, value: string) => void;
	submitForm: (isNextLookAndFeel?: boolean) => void;
	resetFormValue: (prop: keyof FtcFormItemsInterface) => void;
	setIsLoading: (isLoading: boolean) => void;
}

export interface FtcUsernamePasswordInterface {
	username: string | null;
	password: string | null;
}

const ftcData = FtcScreenData();
// @todo: Decide on window object manipulation.
// const wizardWindowObject = window?.sitebuilder?.wizards?.ftc;
const { submitForm: submitFormContent } = FtcStringData;

export const StoreSetupContext = createContext<
	FtcProviderContextInterface | FtcScreenDataInterface | null
>(ftcData);

const StoreSetupProvider = ({
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

	return (
		<StoreSetupContext.Provider
			value={ {
				ftcState,
				setFormValue,
				submitForm,
				resetFormValue,
				setIsLoading
			} }
		>
			{ children }
		</StoreSetupContext.Provider>
	);
};

export default StoreSetupProvider;
