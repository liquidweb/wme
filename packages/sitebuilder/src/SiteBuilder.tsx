import { lazy } from '@wordpress/element';
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
import { SB_THEME } from '@sb/constants';

const SetupScreen: (props: any) => JSX.Element = Loadable(lazy(() => import('@sb/setup/SetupScreen')));

const siteBuilderTheme = createTheme(WME_THEME, SB_THEME);
const queryClient = new QueryClient();

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
