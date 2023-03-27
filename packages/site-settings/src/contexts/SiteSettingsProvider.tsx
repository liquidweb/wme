import { createContext, useState } from 'react';
import { GO_LIVE_PROPS } from '@site/constants';

export interface SiteSettingsStateInterface {
	capturedDomain?: string;
}

export interface SiteSettingsContextInterface {
	siteSettingsState: SiteSettingsStateInterface;
	setSiteSettingsState: (props: any) => void;
}

const localData: SiteSettingsStateInterface = {
	capturedDomain: '',
};

const siteSettingsData = (): SiteSettingsStateInterface => {
	return {
		...localData,
		capturedDomain: GO_LIVE_PROPS.verifyingUrl
	};
};

export const SiteSettingsContext = createContext<SiteSettingsContextInterface | null>({
	siteSettingsState: siteSettingsData(),
	setSiteSettingsState: () => {}
});

const SiteSettingsProvider = ({ children }: { children: React.ReactNode }) => {
	const [siteSettingsState, setSiteSettingsState] = useState<SiteSettingsStateInterface>(siteSettingsData);

	return (
		<SiteSettingsContext.Provider
			value={ {
				siteSettingsState,
				setSiteSettingsState,
			} }
		>
			{ children }
		</SiteSettingsContext.Provider>
	);
};

export default SiteSettingsProvider;
