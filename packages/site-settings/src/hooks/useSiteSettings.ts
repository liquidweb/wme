import { useContext } from 'react';
import { SiteSettingsContext, SiteSettingsContextInterface } from '@site/contexts/SiteSettingsProvider';

export function useSiteSettings() {
	const {
		siteSettingsState,
		setSiteSettingsState,
		setSiteVisibilityValues,
		submitSiteVisibilityForm,
	} = useContext(SiteSettingsContext) as SiteSettingsContextInterface;
	return {
		siteSettingsState,
		setSiteSettingsState,
		setSiteVisibilityValues,
		submitSiteVisibilityForm,
	};
}
