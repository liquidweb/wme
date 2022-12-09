import { lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme as WME_THEME } from '@moderntribe/wme-ui';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import StoreBuilderProvider from '@store/contexts/StoreBuilderProvider';
import Loadable from '@store/components/Loadable';
import { SB_THEME } from '@store/constants';

const SetupScreen = Loadable(lazy(() => import('@store/setup/SetupScreen')));

const storeBuilderTheme = createTheme(WME_THEME, SB_THEME);

const SiteDetails = () => (
	<ThemeProvider theme={ storeBuilderTheme }>
		<StoreBuilderProvider>
			<HashRouter>
				<Routes>
					<Route path="/" element={ <SetupScreen fullscreen={ true } /> } />
				</Routes>
			</HashRouter>
		</StoreBuilderProvider>
	</ThemeProvider>
);

export default SiteDetails;
