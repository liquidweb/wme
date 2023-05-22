import { lazy } from 'react';
import { UI_THEME, SB_THEME } from '@sb/constants';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme as WME_THEME } from '@moderntribe/wme-ui';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import SiteBuilderProvider from '@sb/contexts/SiteBuilderProvider';
import WizardProvider from '@sb/contexts/WizardProvider';
import WizardWrapper from '@sb/wizards/WizardWrapper';
import Loadable from '@sb/components/Loadable';
import { getUITheme } from '@moderntribe/wme-utils';

const SetupScreen: (props: any) => JSX.Element = Loadable(lazy(() => import('@sb/setup/SetupScreen')));
const queryClient = new QueryClient();
const defaultTheme = createTheme(WME_THEME, SB_THEME);
const siteBuilderTheme = createTheme(defaultTheme, getUITheme(UI_THEME));

const SiteBuilder = () => (
	<ThemeProvider theme={ siteBuilderTheme }>
		<QueryClientProvider client={ queryClient }>
			<SiteBuilderProvider>
				<HashRouter>
					<Routes>
						<Route path="/" element={ <SetupScreen fullscreen={ true } /> } />
						<Route path="/wizard/*" element={ <WizardProvider><WizardWrapper /></WizardProvider> } />
						<Route path="*" element={ <Navigate to="/" /> } />
					</Routes>
				</HashRouter>
			</SiteBuilderProvider>
		</QueryClientProvider>
	</ThemeProvider>
);

export default SiteBuilder;
