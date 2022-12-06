/**
 * Scripting for the StoreBuilder React App
 */
import StoreBuilder from '@moderntribe/storebuilder';

wp.element.render(
	wp.element.createElement(StoreBuilder),
	document.getElementById('sitebuilder-store-details-react'),
);
