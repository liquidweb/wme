export default [
	{
		id: 'store-setup',
		title: 'Store Setup',
		intro: 'This is where the fun begins.',
		completed: false,
		chipText: '5 Minutes',
		rows: [
			{
				completed: false,
				id: 'store-setup-wizard',
				type: 'task',
				taskCta: 'Get Started',
				title: 'Set your currency, address, and store type.',
				intro: 'Tell us a little bit about your store.',
				icon: 'setup-icon-store-setup.png',
				wizardHash: '/wizard/store-setup'
			}
		]
	},
	{
		id: 'manage-products',
		title: 'Manage your products',
		intro: 'Give the people what they want.',
		rows: [
			{
				id: 'manage-products-row-1',
				type: 'columns',
				columns: [
					{
						title: 'Add Products',
						links: [
							{
								icon: 'Add',
								title: 'Add a new Product',
								url: 'http://localhost:8888/wp-admin/post-new.php?post_type=product',
								target: '_self'
							},
							{
								icon: 'LocalLibrary',
								title: 'WooCommerce: Managing Products',
								url: 'https://woocommerce.com/document/managing-products/',
								target: '_blank'
							}
						]
					},
					{
						title: 'Import Products',
						links: [
							{
								icon: 'Upload',
								title: 'Import products via CSV',
								url: 'http://localhost:8888/wp-admin/edit.php?post_type=product&page=product_importer',
								target: '_self'
							},
							{
								icon: 'School',
								title: 'Tutorial: Product CSV',
								url: 'https://woocommerce.com/document/product-csv-importer-exporter/',
								target: '_blank'
							},
							{
								icon: 'Downloading',
								title: 'Download sample CSV file',
								url: 'https://github.com/woocommerce/woocommerce/blob/master/sample-data/sample_products.csv',
								target: '_blank'
							}
						]
					},
					{
						title: 'Setting Up Taxes',
						links: [
							{
								icon: 'Add',
								title: 'Set Up Tax Rates',
								url: 'http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=tax',
								target: '_self'
							},
							{
								icon: 'School',
								title: 'WP 101: Tax Settings',
								url: 'wp101:woocommerce-tax-settings',
								target: '_self'
							},
							{
								icon: 'Downloading',
								title: 'Sample Tax Rate Table',
								url: 'https://github.com/woocommerce/woocommerce/blob/master/sample-data/sample_tax_rates.csv',
								target: '_blank'
							}
						]
					}
				]
			},
			{
				id: 'learn-product-types',
				type: 'learn-product-types',
				title: 'Learn more about Product Types',
				overline: '2 Minutes',
				headline: 'Understanding Types of Products in Storebuilder',
				videoData: {
					placeholderImage: 'setup-product-types-poster.png',
					ariaLabel: 'Click to play video',
					src: 'https://www.youtube.com/embed/YwjYtoE5UMQ',
					description: 'There are 4 main types of products to choose from when adding products in StoreBuilder. This video describes each, and what each one is used for.',
				},
				wp101: {
					header: 'How To Set Up Products',
					links: [
						{
							title: 'Simple',
							modalTitle: 'Simple Product Overview',
							url: 'wp101:woocommerce-simple-product',
						},
						{
							title: 'Variable',
							modalTitle: 'Variable Product Overview',
							url: 'wp101:woocommerce-variable-products',
						},
						{
							title: 'Grouped',
							modalTitle: 'Grouped Product Overview',
							url: 'wp101:woocommerce-grouped-product',
						},
						{
							title: 'Downloadable',
							modalTitle: 'Downloadable Product Overview',
							url: 'wp101:woocommerce-downloadable-products',
						}
					],
				}
			}
		]
	},
	{
		id: 'shipping-configuration',
		title: 'Configure shipping',
		intro: 'Offer flat rate shipping and/or set up ShipStation to offer multiple rates.',
		completed: false,
		rows: [
			{
				id: 'flat-rate',
				type: 'task',
				taskCta: 'Flat Rate Settings',
				title: 'Flat Rate Shipping',
				intro: 'Charge a fixed rate of your choosing for shipping.',
				icon: 'setup-icon-shipping.png',
				url: 'http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=shipping'
			},
			{
				id: 'shipping-wizard',
				type: 'button',
				wizardHash: '/wizard/shipping',
				title: 'Add another way to ship'
			}
		],
		footer: {
			collapsible: true,
			collapsibleLabel: 'Learn more about Shipping',
			rows: [
				{
					type: 'learn-product-types',
					title: 'Learn more about Product Types',
					overline: '3 Minutes',
					headline: 'Understanding Flat Rate Shipping in Storebuilder',
					videoData: {
						placeholderImage: 'setup-shipping-poster.png',
						ariaLabel: 'Click to play video',
						src: 'https://www.youtube.com/embed/EXMe2i7OSQM',
						description: 'When setting up shipping in StoreBuilder, there are three concepts to understand: Flat Rate Shipping, Shipping Zones, and Shipping Classes. This video describes each and how they interact to ensure customers are charged correctly to ship their purchases.',
					},
				},
				{
					type: 'columns',
					gridColumns: 3,
					columns: [
						{
							heading: 'Shipping Zones',
							list: [
								{
									icon: 'Add',
									title: 'Set up Shipping Zones',
									url: 'http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=shipping',
									target: '_self'
								},
								{
									icon: 'LocalLibrary',
									title: 'WooCommerce: Shipping Zones Docs',
									url: 'https://woocommerce.com/document/setting-up-shipping-zones/',
									target: '_blank'
								}
							]
						},
						{
							heading: 'Shipping Classes',
							list: [
								{
									icon: 'Add',
									title: 'Set up Shipping Classes',
									url: 'http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=shipping&section=classes',
									target: '_self'
								},
								{
									icon: 'School',
									title: 'Tutorial: Shipping Classes',
									url: 'wp101:woocommerce-shipping-classes',
									target: '_self'
								},
								{
									icon: 'LocalLibrary',
									title: 'WooCommerce: Shipping Classes Docs',
									url: 'https://woocommerce.com/document/product-shipping-classes/',
									target: '_blank'
								}
							]
						},
						{
							heading: 'Shipping Calculations',
							list: [
								{
									icon: 'Add',
									title: 'Set Flat Rate shipping calculations',
									url: 'http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=shipping&section=options',
									target: '_blank'
								},
								{
									icon: 'School',
									title: 'Tutorial: Flat Rate Shipping',
									url: 'wp101:woocommerce-flat-rate-shipping',
									target: '_self'
								}
							]
						}
					]
				}
			]
		}
	}
];
