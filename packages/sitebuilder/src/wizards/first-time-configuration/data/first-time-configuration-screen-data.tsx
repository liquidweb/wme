import formItemsData, { FtcFormItemsInterface } from './ftc-form';
import stepsData from './ftc-steps';

export interface FtcSiteLogoObjectInterface {
	id: string;
	url: string;
}
export interface FtcSiteObject {
	logo: FtcSiteLogoObjectInterface;
}

export interface FtcScreenDataInterface {
	isLoading: boolean;
	lastStep: number;
	steps: Array<StepInterface>;
	id: string;
	completed: boolean;
	adminUrl: string;
	username: string;
	site: FtcSiteObject;
	previewLogo: FtcSiteLogoObjectInterface;
	ajax: SiteBuilderAjaxObject;
	form: FtcFormItemsInterface;

	industryVerticals: Record<string, string[]>;
	personalityOptions: string[];
}

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

const localData: Omit<FtcScreenDataInterface, 'form' | 'steps'> = {
	isLoading: false,
	lastStep: stepsData.length,
	id: '',
	completed: false,
	adminUrl: '',
	username: '',
	site: {
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
	industryVerticals,
	personalityOptions
};

const setInitialFormValues = (wizardData: any): Omit<FtcFormItemsInterface, 'password'> => {
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
			fontPairing = ''
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
	form.fontPairing.value = fontPairing;

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
	const formData = serverData ? setInitialFormValues(serverData) : formItemsData;
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
