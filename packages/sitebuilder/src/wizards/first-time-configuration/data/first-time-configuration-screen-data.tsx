	import { __ } from '@wordpress/i18n';

import {
	UsernamePassword,
	SiteDetails,
	Processing,
	IndustryScreen,
	GoalsScreen,
	StyleScreen,
	StyleReview
} from '../screens';

import {
	UserIcon,
	EditIcon,
	GoalIcon,
	MessageIcon,
} from '@sb/icons';
import ColorSelection from '@ftc/components/styles/ColorSelection';

export interface FtcSiteLogoObjectInterface {
	id: string;
	url: string;
}
export interface FtcSiteObject {
	logo: FtcSiteLogoObjectInterface;
	siteName: string;
	tagline: string;
	industry: string;
	subIndustry: string;
	siteDescription: string;
	sitePersonality: string;
	siteKeywords: string[];
	goals: string[];
	template: string;
	colorPalette: string;
	headingFont: string;
	bodyFont: string;

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

export interface FtcFormValueInterface<T> {
	value: T;
	touched: boolean;
	isValid: boolean;
}

type FormItems<T> = {
	[Property in keyof T]: FtcFormValueInterface<T[Property]>;
};

export interface FtcFormItemsInterface
	extends Omit<FormItems<FtcSiteObject>, 'logo'> {
	username: FtcFormValueInterface<string>;
	password: FtcFormValueInterface<string>;
	logoId: FtcFormValueInterface<string>;
}

export interface FtcScreenDataInterface extends FtcWizardObjectInterface {
	isLoading: boolean;
	lastStep: number;
	steps: Array<StepInterface>;
	form: FtcFormItemsInterface;
	industryVerticals: Record<string, string[]>;
	personalityOptions: string[];
}

const stepsData: Array<StepInterface> = [
	{
		id: 0,
		label: __('Login', 'moderntribe-sitebuilder'),
		title: __('Username and Password', 'moderntribe-sitebuilder'),
		description: __(
			'Welcome to your site! Let\'s make it yours by getting you a username and password that\'s unique to you.',
			'moderntribe-sitebuilder'
		),
		icon: <UserIcon />,
		disableNext: true,
		hideSkip: true,
		hideBack: true,
		hideExit: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <UsernamePassword />
	},
	{
		id: 1,
		label: __('Industry', 'moderntribe-sitebuilder'),
		title: __('Lets set up your site details.', 'moderntribe-sitebuilder'),
		icon: <MessageIcon />,
		disableNext: true,
		hideSkip: true,
		hideExit: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <IndustryScreen />
	},
	{
		id: 2,
		label: __('Goals', 'moderntribe-sitebuilder'),
		title: __(
			'What are the goals of this site?',
			'moderntribe-sitebuilder'
		),
		description: __(
			'Based on your industry we\'ve got some recommendations of what you may need to accomplish your business goals.',
			'moderntribe-sitebuilder'
		),
		footerHelpText: __(
			'Not sure what you need right now? That\'s okay! You can add and remove stuff like this at anytime.',
			'moderntribe-sitebuilder'
		),
		icon: <GoalIcon />,
		hideSkip: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <GoalsScreen />
	},
	{
		id: 3,
		label: __('Site', 'moderntribe-sitebuilder'),
		title: __('Lets set up your site details.', 'moderntribe-sitebuilder'),
		description: __(
			'Tell us a bit about your site and we can start setting up everything you\'ll need.',
			'moderntribe-sitebuilder'
		),
		icon: <EditIcon />,
		disableNext: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <SiteDetails />
	},
	{
		id: 4,
		label: __('Style', 'moderntribe-sitebuilder'),
		title: __('Style Starter', 'moderntribe-sitebuilder'),
		// description: __(
		// 	'Grab a starter template to get you going, but don\'t worry, you\'ll be able to update fonts, colors, imagery… You get the idea. We could keep listing things but let\'s keep moving.',
		// 	'moderntribe-sitebuilder'
		// ),
		footerHelpText: __(
			'You\'ll be able to change all of this at any time down to the smallest detail (if you want).',
			'moderntribe-sitebuilder'
		),
		sidebarComponent: <ColorSelection />,
		hideSkip: true,
		disableNext: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <StyleScreen />
	},
	{
		id: 5,
		label: __('Processing', 'moderntribe-sitebuilder'),
		hideSkip: true,
		hidePagination: true,
		hideSidebar: true,
		hideExit: true,
		hideFooter: true,
		hideNext: true,
		hideBack: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <Processing />
	},
	{
		id: 6,
		label: __('Review', 'moderntribe-sitebuilder'),
		title: __('This is beginning of something really awesome.', 'moderntribe-sitebuilder'),
		description: __(
			'You\'ve got a great start on a digital presence for your business. We\'ve set up a starter navigation for you based on what we know so far. Hit "Save & Continue" and we can start really making it yours.',
			'moderntribe-sitebuilder'
		),
		hideExit: false,
		hideSkip: true,
		hideBack: true,
		nextText: __('Save & Continue', 'moderntribe-sitebuilder'),
		screen: <StyleReview />
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
	siteDescription: {
		value: '',
		touched: false,
		isValid: true
	},
	sitePersonality: {
		value: '',
		touched: false,
		isValid: true
	},
	siteKeywords: {
		value: [],
		touched: false,
		isValid: true
	},
	goals: {
		value: [],
		touched: false,
		isValid: true
	},
	template: {
		value: '',
		touched: false,
		isValid: true
	},
	colorPalette: {
		value: '',
		touched: false,
		isValid: true
	},
	headingFont: {
		value: '',
		touched: false,
		isValid: true
	},
	bodyFont: {
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
	Events: ['Conference', 'Venue', 'Single Event', 'Event Planning'],
	Education: ['School', 'Informal Education', 'Coaching'],
	'Food and Drinks': ['Restaurant', 'Cafe', 'Bar', 'Chef & Catering'],
	'Online Store': [
		'Accessories & Jewelry',
		'Fashion',
		'Home Goods',
		'Kids',
		'Pets',
		'Arts & Crafts'
	],
	Personal: ['Personal website or business card'],
	Landing: ['Promotional', 'Coming Soon'],
	Other: []
};

const personalityOptions: string[] = [
	'Quirky',
	'Calm',
	'Spicy',
	'Classic',
	'Elegant',
	'Funny',
	'Witty'
];

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
		tagline: '',
		industry: '',
		subIndustry: '',
		siteDescription: '',
		sitePersonality: '',
		siteKeywords: [],
		goals: [],
		template: '',
		colorPalette: '',
		headingFont: '',
		bodyFont: ''
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
	personalityOptions
};

const setInitialFormValues = (
	wizardData: FtcWizardObjectInterface
): Omit<FtcFormItemsInterface, 'password'> => {
	const {
		username,
		site: {
			logo: { id },
			siteName = '',
			tagline = '',
			industry = '',
			subIndustry = '',
			siteDescription = '',
			sitePersonality = '',
			siteKeywords = [],
			goals = [],
			template = '',
			colorPalette = '',
			headingFont = '',
			bodyFont = ''
		}
	} = wizardData;

	const form = formItemsData;

	form.username.value = username;
	form.logoId.value = String(id);
	form.siteName.value = siteName;
	form.tagline.value = tagline;
	form.industry.value = industry;
	form.subIndustry.value = subIndustry;
	form.siteDescription.value = siteDescription;
	form.sitePersonality.value = sitePersonality;
	form.siteKeywords.value = siteKeywords;
	form.goals.value = goals;
	form.template.value = template;
	form.colorPalette.value = colorPalette;
	form.headingFont.value = headingFont;
	form.bodyFont.value = bodyFont;

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
