import { lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme as WME_THEME } from '@moderntribe/wme-ui';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Loadable from '@site/components/Loadable';
import { SD_THEME } from '@site/constants';

const SetupScreen = Loadable(lazy(() => import('@site/setup/SetupScreen')));

const storeBuilderTheme = createTheme(WME_THEME, SD_THEME);

const SiteDetails = () => (
	<ThemeProvider theme={ storeBuilderTheme }>
		<HashRouter>
			<Routes>
				<Route path="/" element={ <SetupScreen fullscreen={ true } /> } />
			</Routes>
		</HashRouter>
	</ThemeProvider>
);

export default SiteDetails;
