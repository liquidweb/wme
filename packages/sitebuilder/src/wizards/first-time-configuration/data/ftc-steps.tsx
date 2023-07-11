import { __ } from '@wordpress/i18n';
import {
	UsernamePassword,
	SiteDetails,
	Processing,
	GoalsScreen,
	StyleScreen,
	StyleReview,
	Identity,
	About,
} from '../screens';
import TemplateStyleSidebar from '@ftc/components/styles/TemplateStyleSidebar';
import ContentTone from '../screens/ContentTone';

const stepsData: Array<StepInterface> = [
	{
		id: 0,
		label: __('Login', 'moderntribe-sitebuilder'),
		title: __('Username and Password', 'moderntribe-sitebuilder'),
		description: __(
			'Welcome to your site! Let\'s make it yours by getting you a username and password that\'s unique to you.',
			'moderntribe-sitebuilder'
		),
		disableNext: true,
		hideSkip: true,
		hideBack: true,
		hideExit: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <UsernamePassword />
	},
	{
		id: 1,
		label: __('Identity', 'moderntribe-sitebuilder'),
		title: __('Your Information', 'moderntribe-sitebuilder'),
		description: __(
			'Please provide detailed information about yourself, your company, or your organization to enhance the quality of our results.',
			'moderntribe-sitebuilder'
		),
		disableNext: true,
		hideSkip: true,
		hideExit: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <Identity />
	},
	{
		id: 2,
		label: __('About', 'moderntribe-sitebuilder'),
		title: __('Tell us about your [self/business/org]', 'moderntribe-sitebuilder'),
		description: __(
			'We suggest drafting a few paragraphs that underscore your primary attributes or functions, and spotlight what differentiates you from the rest.',
			'moderntribe-sitebuilder'
		),
		disableNext: true,
		hideSkip: true,
		hideExit: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <About />
	},
	// {
	// 	id: 3,
	// 	label: __('Content', 'moderntribe-sitebuilder'),
	// 	title: __('Make it yours', 'moderntribe-sitebuilder'),
	// 	description: __(
	// 		'We\'ll use Keywords and tone to provide copy guidance (if you want) as you create your site.',
	// 		'moderntribe-sitebuilder'
	// 	),
	// 	disableNext: true,
	// 	hideSkip: true,
	// 	hideExit: false,
	// 	nextText: __('Next', 'moderntribe-sitebuilder'),
	// 	screen: <ContentTone />
	// },
	{
		id: 3,
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
		hideSkip: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <GoalsScreen />
	},
	{
		id: 4,
		label: __('Site', 'moderntribe-sitebuilder'),
		title: __('Lets set up your site details.', 'moderntribe-sitebuilder'),
		description: __(
			'Tell us a bit about your site and we can start setting up everything you\'ll need.',
			'moderntribe-sitebuilder'
		),
		disableNext: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <SiteDetails />
	},
	{
		id: 5,
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
		sidebarComponent: <TemplateStyleSidebar /> ,
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
export default stepsData;

