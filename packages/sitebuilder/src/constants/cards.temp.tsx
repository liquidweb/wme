export const cards: SetupCardInterface[] = [
	{
		id: 'siteDetails',
		navTitle: 'Site Details',
		title: 'Site Details',
		intro: 'Update your logo, company name and tagline.',
		completed: false,
		rows: [
			{
				id: 'siteDetails-1',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Edit Site Name, Logo & Details',
				intro: 'Tell us a little bit about your site.',
				wizardHash: '/wizard/ftc'
			}
		]
	},
	{
		id: 'style',
		navTitle: 'Style',
		title: 'Style',
		intro: 'Fine tune your selected style choices.',
		completed: false,
		rows: [
			{
				id: 'style-1',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Change your font styles and colors',
				intro: 'Lorem ipsum dolor sit.',
				wizardHash: '#' // Idk what goes here
			},
			{
				id: 'style-2',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Change your colors',
				intro: 'Lorem ipsum dolor sit.',
				wizardHash: '#' // Idk what goes here
			}
		]
	},
	{
		id: 'content',
		navTitle: 'Your Content',
		title: 'Your Content',
		intro: 'Get ready to launch with this content checklist.',
		completed: false,
		rows: [
			{
				id: 'content-1',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Publish your About Page',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			},
			{
				id: 'content-2',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Publish your Services Page',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			},
			{
				id: 'content-3',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Publish your Contact Page',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			},
			{
				id: 'content-4',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Publish your First Blog Post',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			}
		]
	},
	{
		id: 'goals',
		navTitle: 'Goals',
		title: 'Goals',
		intro: 'Get started on your goals by completing a few tasks.',
		completed: false,
		rows: [
			{
				id: 'goals-1',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Configure Your Site',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			}
		]
	},
	{
		id: 'share',
		navTitle: 'Share Your Site',
		title: 'Share Your Site',
		intro: 'Get started on your goals by completing a few tasks.',
		completed: false,
		rows: [
			{
				id: 'share-1',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Set Site Visibility',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			},
			{
				id: 'share-2',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Update Your Domain',
				intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				wizardHash: '#' // Idk what goes here
			}
		]
	}
];
