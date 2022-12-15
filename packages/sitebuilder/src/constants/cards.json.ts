export default [
	{
		id: 'ftc',
		title: 'Set up your site',
		intro: 'This is where the fun begins.',
		completed: false,
		navTitle: 'The Basics',
		rows: [
			{
				completed: false,
				id: 'ftc-wizard',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Site Name, Logo & Store Details',
				intro: 'Tell us a little bit about your site.',
				icon: 'setup-icon-setup.png',
				wizardHash: '/wizard/ftc'
			},
			{
				completed: false,
				id: 'ftc-wizard',
				type: 'task',
				taskCta: 'Get Going',
				title: 'Payment Gateway and Subscriptions',
				intro: 'How do you want to sell on your site.',
				icon: 'setup-icon-setup.png',
				wizardHash: '/wizard/ftc'
			}
		],
		footer: {
			collapsible: true,
			collapsibleLabel: 'Expand this section',
			rows: [
				{
					type: 'columns',
					gridColumns: 2,
					columns: [
						{
							image: 'https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						},
						{
							heading: 'Christmas time is here',
							paragraph: 'The best christmas movie is clearly Die Hard. Its the best of all time, you cannot change my mind!',
						}
					]
				},
				{
					type: 'columns',
					gridColumns: 3,
					columns: [
						{
							image: 'https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						},
						{
							heading: 'Christmas time is here',
							paragraph: 'The best christmas movie is clearly Die Hard. Its the best of all time, you cannot change my mind!',
						},
						{
							image: 'https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						},
					]
				}
			]
		}
	},
	{
		id: 'look-and-feel',
		title: 'Design your site',
		intro: 'It\'s all about appearances.',
		navTitle: 'Design',
		completed: false,
		rows: [
			{
				completed: true,
				id: 'look-and-feel-wizard',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Select A Starter Template',
				intro: 'Choose a design to start with and customize.',
				wizardHash: '/wizard/look-and-feel'
			},
			{
				completed: false,
				id: 'look-and-feel-wizard',
				type: 'task',
				taskCta: 'Setup Styles',
				title: 'Setup styles for your site',
				intro: 'Choose a design to start with and customize.',
				wizardHash: '/wizard/look-and-feel'
			},
			{
				completed: false,
				id: 'look-and-feel-wizard',
				type: 'task',
				taskCta: 'Choose add-ons',
				title: 'Give your site extra functionality',
				intro: 'Add instant chat or video help.',
				url: 'https://www.kadencewp.com/kadence-blocks/'
			}
		],
		footer: {
			collapsible: false,
			rows: [
				{
					type: 'links',
					title: 'Lorum ipsum',
					links: [
						{
							label: 'Lorem',
							href: 'https://tri.be',
						},
						{
							label: 'Ipsum',
							href: 'https://tri.be',
						}
					]
				}
			]
		}
	},
	{
		id: 'launch-domain',
		title: 'Go Live with a domain',
		intro: 'Go live with a custom domain, whether you purchased with Nexcess or elsewhere.',
		navTitle: 'Domain',
		completed: false,
		rows: [
			{
				id: 'launch-domain-status',
				type: 'launch-domain-status'
			},
			{
				completed: false,
				id: 'site-domain-wizard',
				type: 'task',
				title: 'Publish your site with a custom domain',
				intro: 'Update your store URL with a custom domain you own',
				icon: 'setup-icon-launch.png',
				taskCta: 'Get Started',
				wizardHash: '/wizard/go-live'
			}
		]
	},
	{
		id: 'ftc-2',
		title: 'Create your metrics',
		intro: 'This is where the fun begins.',
		navTitle: 'Goals',
		completed: false,
		rows: [
			{
				completed: false,
				id: 'ftc-wizard',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Site Name, Logo & Store Details',
				intro: 'Tell us a little bit about your site.',
				icon: 'setup-icon-setup.png',
				wizardHash: '/wizard/ftc'
			},
			{
				completed: false,
				id: 'ftc-wizard',
				type: 'task',
				taskCta: 'Get Going',
				title: 'Payment Gateway and Subscriptions',
				intro: 'How do you want to sell on your site.',
				icon: 'setup-icon-setup.png',
				wizardHash: '/wizard/ftc'
			}
		],
		footer: {
			collapsible: true,
			collapsibleLabel: 'Expand this section',
			rows: [
				{
					type: 'columns',
					gridColumns: 2,
					columns: [
						{
							image: 'https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						},
						{
							heading: 'Christmas time is here',
							paragraph: 'The best christmas movie is clearly Die Hard. Its the best of all time, you cannot change my mind!',
						}
					]
				},
				{
					type: 'columns',
					gridColumns: 3,
					columns: [
						{
							image: 'https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						},
						{
							heading: 'Christmas time is here',
							paragraph: 'The best christmas movie is clearly Die Hard. Its the best of all time, you cannot change my mind!',
						},
						{
							image: 'https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						},
					]
				}
			]
		}
	},
	{
		id: 'look-and-feel-2',
		title: 'Start a blog',
		intro: 'It\'s all about appearances.',
		navTitle: 'Content',
		completed: false,
		rows: [
			{
				completed: true,
				id: 'look-and-feel-wizard',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Select A Starter Template',
				intro: 'Choose a design to start with and customize.',
				wizardHash: '/wizard/look-and-feel'
			},
			{
				completed: false,
				id: 'look-and-feel-wizard',
				type: 'task',
				taskCta: 'Setup Styles',
				title: 'Setup styles for your site',
				intro: 'Choose a design to start with and customize.',
				wizardHash: '/wizard/look-and-feel'
			},
			{
				completed: false,
				id: 'look-and-feel-wizard',
				type: 'task',
				taskCta: 'Choose add-ons',
				title: 'Give your site extra functionality',
				intro: 'Add instant chat or video help.',
				url: 'https://www.kadencewp.com/kadence-blocks/'
			}
		],
		footer: {
			collapsible: false,
			rows: [
				{
					type: 'links',
					title: 'Lorum ipsum',
					links: [
						{
							label: 'Lorem',
							href: 'https://tri.be',
						},
						{
							label: 'Ipsum',
							href: 'https://tri.be',
						}
					]
				}
			]
		}
	},
	{
		id: 'launch-domain-2',
		title: 'Start an online store',
		intro: 'Go live with a custom domain, whether you purchased with Nexcess or elsewhere.',
		navTitle: 'Store',
		completed: false,
		rows: [
			{
				id: 'launch-domain-status',
				type: 'launch-domain-status'
			},
			{
				completed: false,
				id: 'site-domain-wizard',
				type: 'task',
				title: 'Publish your site with a custom domain',
				intro: 'Update your store URL with a custom domain you own',
				icon: 'setup-icon-launch.png',
				taskCta: 'Get Started',
				wizardHash: '/wizard/go-live'
			}
		]
	}
];
