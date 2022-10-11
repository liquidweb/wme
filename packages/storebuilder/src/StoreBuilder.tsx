import React, { lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme as WME_THEME } from '@stellarwp/wme-ui';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import WizardProvider from '@store/contexts/WizardProvider';
import WizardWrapper from '@store/wizards/WizardWrapper';
import Loadable from '@store/components/Loadable';

import { SB_THEME } from '@store/constants';

const SetupScreen = Loadable(lazy(() => import('@store/setup/SetupScreen')));

const storeBuilderTheme = createTheme(WME_THEME, SB_THEME);

const StoreBuilder = () => (
	<ThemeProvider theme={ storeBuilderTheme }>
		<HashRouter>
			<Routes>
				<Route path="/" element={ <SetupScreen fullscreen={ true } /> } />
				<Route path="/wizard/*" element={ <WizardProvider><WizardWrapper /></WizardProvider> } />
				<Route path="*" element={ <Navigate to="/" /> } />
			</Routes>
		</HashRouter>
	</ThemeProvider>
);

export default StoreBuilder;