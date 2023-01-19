import { __ } from '@wordpress/i18n';

import { UsernamePassword, SiteDetails, Complete } from '../screens';

import { UserIcon, EditIcon, GoalIcon, MessageIcon, StyleIcon } from '@sb/icons';

export interface FtcSiteLogoObjectInterface {
	id: string;
	url: string;
}
export interface FtcSiteObject {
	siteName: string;
	logo: FtcSiteLogoObjectInterface;
	industry: string;
	subIndustry: string;
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
	industry: FtcFormValueInterface;
	subIndustry: FtcFormValueInterface;
}

export interface FtcScreenDataInterface extends FtcWizardObjectInterface {
	isLoading: boolean;
	lastStep: number;
	steps: Array<StepInterface>;
	form: FtcFormItemsInterface;
	industryVerticals: Record<string, string[]>;
}

const stepsData: Array<StepInterface> = [
	{
		id: 0,
		label: __('Login', 'moderntribe-sitebuilder'),
		title: __('Login', 'moderntribe-sitebuilder'),
		description: __('Welcome to your site! Let\'s make it yours by getting you a username and password that\'s unique to you.', 'moderntribe-sitebuilder'),
		icon: <UserIcon />,
		disableNext: true,
		hideSkip: true,
		hideBack: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <UsernamePassword />
	},
	{
		id: 1,
		label: __('Details', 'moderntribe-sitebuilder'),
		title: __('Lets set up your site details.', 'moderntribe-sitebuilder'),
		description: __('Tell us a bit about your site and we can start setting up everything you\'ll need.', 'moderntribe-sitebuilder'),
		icon: <EditIcon />,
		hideSkip: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <SiteDetails />
	},
	{
		id: 2,
		label: __('Content', 'moderntribe-sitebuilder'),
		title: __('In your own words, tell us about your business.', 'moderntribe-sitebuilder'),
		description: __('We\'ll leverage AI writing to help get you started. This will fill your site with placeholder copy that you can change, tweak, or use to your hearts content.', 'moderntribe-sitebuilder'),
		icon: <MessageIcon />,
		hideSkip: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <SiteDetails />
	},
	{
		id: 3,
		label: __('Goals', 'moderntribe-sitebuilder'),
		title: __('What are the goals of this site?', 'moderntribe-sitebuilder'),
		description: __('Based on your industry we\'ve got some recommendations of what you may need to accomplish your business goals.', 'moderntribe-sitebuilder'),
		icon: <GoalIcon />,
		hideSkip: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <SiteDetails />
	},
	{
		id: 4,
		label: __('Style', 'moderntribe-sitebuilder'),
		title: __('Lets talk style.', 'moderntribe-sitebuilder'),
		description: __('Grab a starter template to get you going, but don\'t worry, you\'ll be able to update fonts, colors, imagery… You get the idea. We could keep listing things but let\'s keep moving.', 'moderntribe-sitebuilder'),
		icon: <StyleIcon />,
		hideSkip: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <SiteDetails />
	},
	{
		id: 5,
		label: __('Complete', 'moderntribe-sitebuilder'),
		hideSkip: true,
		hidePagination: true,
		nextText: __('Save & Exit Setup', 'moderntribe-sitebuilder'),
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
	industry: {
		value: '',
		touched: false,
		isValid: true
	},
	subIndustry: {
		value: '',
		touched: false,
		isValid: true
	},
};

const industryVerticals: Record<string, string[]> = {
	'Non-profit': ['Fundraising', 'Charity', 'Political', 'Religious'],
	Business: ['Consulting', 'Professional Services', 'Home Services'],
	'Real Estate and Creative': ['Architecture', 'Real Estate', 'Agency'],
	Technology: ['Startup', 'SaaS', 'App'],
	'Beauty and Wellness': ['Salon', 'Spa', 'Beauty', 'Therapy', 'Fitness'],
	Portfolio: ['Photography', 'Video', 'Model', 'Designer'],
	Health: ['Doctor', 'Dentist', 'Veterinary', 'Clinic'],
	Travel: ['Tourism', 'Hotel & Lodging'],
	Entertainment: ['Professional Blog', 'Podcast'],
	Events: ['Conference,Venue', 'Single Event', 'Event Planning'],
	Education: ['School', 'Informal Education', 'Coaching'],
	'Food and Drinks': ['Restaurant', 'Cafe', 'Bar', 'Chef & Catering'],
	'Online Store': ['Accessories & Jewelry', 'Fashion', 'Home Goods', 'Kids', 'Pets', 'Arts & Crafts'],
	Personal: ['Personal website or business card'],
	Landing: ['Promotional', 'Coming Soon'],
	Other: [],
};

const localData: FtcScreenDataInterface = {
	isLoading: false,
	lastStep: stepsData.length,
	id: '',
	completed: false,
	adminUrl: '',
	username: '',
	site: {
		siteName: '',
		logo: {
			id: '',
			url: ''
		},
		industry: '',
		subIndustry: '',
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
	form: formItemsData,
	industryVerticals,
};

const setInitialFormValues = (
	wizardData: FtcWizardObjectInterface
): Omit<FtcFormItemsInterface, 'password'> => {
	const {
		username,
		site: {
			logo: { id },
			siteName,
			industry,
			subIndustry
		}
	} = wizardData;

	const form = formItemsData;
	form.username.value = username;
	form.logoId.value = String(id);
	form.siteName.value = siteName;
	form.industry.value = industry || '';
	form.subIndustry.value = subIndustry || '';

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
