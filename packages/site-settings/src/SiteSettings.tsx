import { lazy } from 'react';
import { UI_THEME } from '@site/constants';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme as WME_THEME } from '@moderntribe/wme-ui';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Loadable from '@site/components/Loadable';
import { getUITheme } from '@moderntribe/wme-utils';

const SetupScreen = Loadable(lazy(() => import('@site/setup/SetupScreen')));
const siteSettingsTheme = createTheme(WME_THEME, getUITheme(UI_THEME));

const SiteSettings = () => (
	<ThemeProvider theme={ siteSettingsTheme }>
		<HashRouter>
			<Routes>
				<Route path="/" element={ <SetupScreen fullscreen={ true } /> } />
			</Routes>
		</HashRouter>
	</ThemeProvider>
);

export default SiteSettings;
