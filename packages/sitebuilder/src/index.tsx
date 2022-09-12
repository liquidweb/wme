import React from 'react';
import ReactDOM from 'react-dom/client';

import SiteBuilder from './SiteBuilder';

const container = document.getElementById('sitebuilder-react');
const root = ReactDOM.createRoot(container!);

root.render(
	<React.StrictMode>
		<SiteBuilder />
	</React.StrictMode>
);
