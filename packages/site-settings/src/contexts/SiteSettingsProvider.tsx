import { createContext, useState } from 'react';
import { CARDS, SITE_VISIBILITY, GO_LIVE_PROPS } from '@site/constants';
import { handleActionRequest, removeNulls } from '@moderntribe/wme-utils';

export interface SiteSettingsStateInterface {
	capturedDomain?: string;
	cards?: SetupCardAccordionInterface[];
	siteVisibilityValues?: SiteVisibilityValuesInterface;
}

export interface SiteSettingsContextInterface {
	siteSettingsState: SiteSettingsStateInterface;
	setSiteSettingsState: (props: any) => void;
	setSiteVisibilityValues: (props?: SiteVisibilityValuesInterface) => void;
	submitSiteVisibilityForm: (formData?: SiteVisibilityValuesInterface, doOptimisticUpdate?: boolean) => void;
}

export type setSiteVisibilityValuesFn = (props: any) => void;

const localData: SiteSettingsStateInterface = {
	capturedDomain: GO_LIVE_PROPS.verifyingUrl,
	cards: CARDS,
	siteVisibilityValues: {
		ajax: SITE_VISIBILITY?.ajax,
		hideFromSearch: SITE_VISIBILITY?.hideFromSearch,
		restrictAccess: SITE_VISIBILITY?.restrictAccess,
		password: SITE_VISIBILITY?.password,
		chipText: SITE_VISIBILITY?.chipText,
		chipBackground: SITE_VISIBILITY?.chipBackground,
	},
};

const siteSettingsData = (): SiteSettingsStateInterface => {
	return {
		...localData,
	};
};

export const SiteSettingsContext = createContext<SiteSettingsContextInterface | null>({
	siteSettingsState: siteSettingsData(),
	setSiteSettingsState: () => {},
	setSiteVisibilityValues: () => {},
	submitSiteVisibilityForm: () => {}
});

const SiteSettingsProvider = ({ children }: { children: React.ReactNode }) => {
	const [siteSettingsState, setSiteSettingsState] = useState<SiteSettingsStateInterface>(siteSettingsData);

	const setSiteVisibilityValues:setSiteVisibilityValuesFn = (props: any) => {
		setSiteSettingsState({
			...siteSettingsState,
			siteVisibilityValues: {
				...siteSettingsState.siteVisibilityValues,
				...props,
			},
		});
	};

	const submitSiteVisibilityForm = (formData: SiteVisibilityValuesInterface, doOptimisticUpdate: false) => {
		const { siteVisibilityValues } = siteSettingsState;
		const data = removeNulls({
			_wpnonce: siteVisibilityValues?.ajax?.nonce || '',
			action: siteVisibilityValues?.ajax?.action || '',
			sub_action: 'save',
			hideFromSearch: siteVisibilityValues?.hideFromSearch,
			restrictAccess: siteVisibilityValues?.restrictAccess,
			chipText: siteVisibilityValues?.hideFromSearch ? 'Visible' : 'Hidden',
			chipBackground: siteVisibilityValues?.hideFromSearch ? 'success' : 'error',
			password: siteVisibilityValues?.password,
			...formData,
		});

		handleActionRequest(data)
			.then((response: any) => {
				if (response === 'success' && doOptimisticUpdate) {
					setSiteVisibilityValues({
						...siteVisibilityValues,
						...data,
					});
				}
			})
			.catch(() => {
				setSiteVisibilityValues({
					...siteVisibilityValues,
				});
			});
	};

	return (
		<SiteSettingsContext.Provider
			value={ {
				siteSettingsState,
				setSiteSettingsState,
				setSiteVisibilityValues,
				submitSiteVisibilityForm,
			} }
		>
			{ children }
		</SiteSettingsContext.Provider>
	);
};

export default SiteSettingsProvider;
