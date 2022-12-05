/**
 * Scripting for the SiteBuilder React App
 */
import SiteBuilder from '@moderntribe/sitebuilder';

wp.element.render(
	wp.element.createElement(SiteBuilder),
	document.getElementById('sitebuilder-react'),
);
