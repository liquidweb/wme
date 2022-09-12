import React, { lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme as WME_THEME } from '@stellarwp/wme-ui';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import WizardProvider from '@sb/contexts/WizardProvider';
import WizardWrapper from '@sb/wizards/WizardWrapper';
import Loadable from '@sb/components/Loadable';
import { SB_THEME } from '@sb/constants';

const SetupScreen = Loadable(lazy(() => import('@sb/setup/SetupScreen')));

const siteBuilderTheme = createTheme(WME_THEME, SB_THEME);

const SiteBuilder = () => (
	<ThemeProvider theme={ siteBuilderTheme }>
		<HashRouter>
			<Routes>
				<Route path="/" element={ <SetupScreen /> } />
				<Route path="/wizard/*" element={ <WizardProvider><WizardWrapper /></WizardProvider> } />
				<Route path="*" element={ <Navigate to="/" /> } />
			</Routes>
		</HashRouter>
	</ThemeProvider>
);

export default SiteBuilder;
