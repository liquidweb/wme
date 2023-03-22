/**
 * Scripting for the SiteBuilder React App
 */
import SiteSettings from '@moderntribe/site-settings';

wp.element.render(
	wp.element.createElement(SiteSettings),
	document.getElementById('site-settings-react'),
);
