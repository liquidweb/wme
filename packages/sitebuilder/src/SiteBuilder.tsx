import { lazy } from 'react';
import { UI_THEME, SB_THEME } from '@sb/constants';
import {
	Experimental_CssVarsProvider as CssVarsProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material/styles';
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
const defaultTheme = extendTheme(WME_THEME, SB_THEME);
const siteBuilderTheme = extendTheme(defaultTheme, getUITheme(UI_THEME));

const SiteBuilder = () => (
	<CssVarsProvider theme={ siteBuilderTheme }>
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
	</CssVarsProvider>
);

export default SiteBuilder;
