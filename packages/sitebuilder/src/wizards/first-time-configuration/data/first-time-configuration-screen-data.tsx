import { __ } from '@wordpress/i18n';

import { Start, UsernamePassword, SiteDetails, Complete } from '../screens';

export interface FtcSiteLogoObjectInterface {
	id: string;
	url: string;
}
export interface FtcSiteObject {
	siteName: string;
	tagline: string;
	logo: FtcSiteLogoObjectInterface;
}

export interface FtcWizardObjectInterface {
	id: string;
	completed: boolean;
	adminUrl: string;
	username: string;
	site: FtcSiteObject;
	previewLogo: FtcSiteLogoObjectInterface;
	ajax: SiteBuilderAjaxObject;
}

export interface FtcFormValueInterface {
	value: string;
	touched: boolean;
	isValid: boolean;
}

export interface FtcFormItemsInterface {
	username: FtcFormValueInterface;
	password: FtcFormValueInterface;
	logoId: FtcFormValueInterface;
	siteName: FtcFormValueInterface;
	tagline: FtcFormValueInterface;
}

export interface FtcScreenDataInterface extends FtcWizardObjectInterface {
	isLoading: boolean;
	lastStep: number;
	steps: Array<StepInterface>;
	form: FtcFormItemsInterface;
}

const stepsData: Array<StepInterface> = [
	{
		id: 0,
		label: __('Start', 'nexcess-mapps'),
		hideSkip: true,
		nextText: __('Get Started', 'nexcess-mapps'),
		hideBack: true,
		hidePagination: true,
		screen: <Start />
	},
	{
		id: 1,
		label: __('Username & Password', 'nexcess-mapps'),
		disableNext: true,
		hideSkip: true,
		nextText: __('Next', 'nexcess-mapps'),
		screen: <UsernamePassword />
	},
	{
		id: 2,
		label: __('Site Details', 'nexcess-mapps'),
		hideSkip: true,
		nextText: __('Next', 'nexcess-mapps'),
		screen: <SiteDetails />
	},
	{
		id: 3,
		label: __('Complete', 'nexcess-mapps'),
		hideSkip: true,
		hidePagination: true,
		nextText: __('Save & Exit Setup', 'nexcess-mapps'),
		screen: <Complete />
	}
];

const formItemsData: FtcFormItemsInterface = {
	username: {
		value: '',
		touched: false,
		isValid: false
	},
	password: {
		value: '',
		touched: false,
		isValid: false
	},
	logoId: {
		value: '',
		touched: false,
		isValid: true
	},
	siteName: {
		value: '',
		touched: false,
		isValid: true
	},
	tagline: {
		value: '',
		touched: false,
		isValid: true
	}
};

const localData: FtcScreenDataInterface = {
	isLoading: false,
	lastStep: 4,
	id: '',
	completed: false,
	adminUrl: '',
	username: '',
	site: {
		siteName: '',
		tagline: '',
		logo: {
			id: '',
			url: ''
		}
	},
	previewLogo: {
		id: '',
		url: ''
	},
	ajax: {
		action: '',
		nonce: '',
		url: ''
	},
	steps: stepsData,
	form: formItemsData
};

const setInitialFormValues = (
	wizardData: FtcWizardObjectInterface
): Omit<FtcFormItemsInterface, 'password'> => {
	const {
		username,
		site: {
			logo: { id },
			siteName,
			tagline
		}
	} = wizardData;

	const form = formItemsData;
	form.username.value = username;
	form.logoId.value = String(id);
	form.siteName.value = siteName;
	form.tagline.value = tagline;

	return form;
};

const getStepsData = (disable: boolean) => {
	return stepsData.map((step) => {
		step.disable = disable;
		return step;
	});
};

const FtcScreenData = (): FtcScreenDataInterface => {
	const serverData = window?.sitebuilder?.wizards.ftc;
	const { completed } = serverData;
	const formData = serverData
		? setInitialFormValues(serverData)
		: formItemsData;
	const steps = getStepsData(! completed);
	const previewLogoData = {
		id: serverData?.site?.logo?.id ? String(serverData.site.logo.id) : '',
		url: serverData?.site?.logo?.url ? serverData.site.logo.url : ''
	};

	return Object.assign(
		{},
		localData,
		serverData,
		{ steps },
		{ form: formData },
		{ previewLogo: previewLogoData }
	);
};

export default FtcScreenData;
