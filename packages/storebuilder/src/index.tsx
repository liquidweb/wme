import React from 'react';
import ReactDOM from 'react-dom/client';

import StoreBuilder from './StoreBuilder';

const container = document.getElementById('sitebuilder-react');
const root = ReactDOM.createRoot(container!);

root.render(
	<React.StrictMode>
		<StoreBuilder />
	</React.StrictMode>
);
