import { __ } from '@wordpress/i18n';
import {
	UsernamePassword,
	Processing,
	GoalsScreen,
	StyleScreen,
	StyleReview,
	Identity,
	About,
	ContentTone,
	ImageSelection
} from '../screens';
import TemplateStyleSidebar from '@ftc/components/styles/TemplateStyleSidebar';

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
		label: __('Your Info', 'moderntribe-sitebuilder'),
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
		label: __('Your Site', 'moderntribe-sitebuilder'),
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
	{
		id: 3,
		label: __('Site Details', 'moderntribe-sitebuilder'),
		title: __('Make it yours', 'moderntribe-sitebuilder'),
		description: __(
			'We\'ll use Keywords and tone to provide copy guidance (if you want) as you create your site.',
			'moderntribe-sitebuilder'
		),
		disableNext: true,
		hideSkip: true,
		hideExit: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <ContentTone />
	},
	{
		id: 4,
		label: __('Goals', 'moderntribe-sitebuilder'),
		title: __(
			'What are the goals of this site?',
			'moderntribe-sitebuilder'
		),
		description: __(
			'To get started, simply outline your goals and we\'ll take care of the rest. We will create pages on your website based on your selections.',
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
		label: __('Photos', 'moderntribe-sitebuilder'),
		title: __('Images', 'moderntribe-sitebuilder'),
		description: __(
			'You can tell they\'re images because of the way they are!',
			'moderntribe-sitebuilder'
		),
		disableNext: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <ImageSelection />
	},
	{
		id: 5,
		label: __('Template', 'moderntribe-sitebuilder'),
		title: __('Let\'s talk style.', 'moderntribe-sitebuilder'),
		description: __(
			'Grab a starter template to get you going, but don\'t worry, you\'ll be able to update fonts, colors, imagery … You get the idea. We could keep listing things but let’s keep moving.',
			'moderntribe-sitebuilder'
		),
		footerHelpText: __(
			'You\'ll be able to change all of this at any time down to the smallest detail (if you want).',
			'moderntribe-sitebuilder'
		),
		hideSkip: true,
		disableNext: true,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <StyleScreen />
	},
	{
		id: 6,
		label: __('Style', 'moderntribe-sitebuilder'),
		title: __('Style starter.', 'moderntribe-sitebuilder'),
		footerHelpText: __(
			'You\'ll be able to change all of this at any time down to the smallest detail (if you want).',
			'moderntribe-sitebuilder'
		),
		sidebarComponent: <TemplateStyleSidebar />,
		hideSkip: true,
		disableNext: false,
		nextText: __('Next', 'moderntribe-sitebuilder'),
		screen: <StyleReview />
	},
	{
		id: 7,
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
	}
];
export default stepsData;

