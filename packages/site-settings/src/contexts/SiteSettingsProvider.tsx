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
	setSiteVisibilityValues: (props: any) => void;
	submitSiteVisibilityForm: (props?: any) => void;
}

export type setSiteVisibilityValuesFn = (props: any) => void;

const localData: SiteSettingsStateInterface = {
	capturedDomain: GO_LIVE_PROPS.verifyingUrl,
	cards: CARDS,
	siteVisibilityValues: {
		ajax: SITE_VISIBILITY?.ajax,
		hideFromSearch: SITE_VISIBILITY?.hideFromSearch === 'true',
		restrictAccess: SITE_VISIBILITY?.restrictAccess === 'true',
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

	const submitSiteVisibilityForm = (formData: SiteVisibilityValuesInterface) => {
		const { siteVisibilityValues } = siteSettingsState;
		const data = removeNulls({
			_wpnonce: siteVisibilityValues?.ajax?.nonce || '',
			action: siteVisibilityValues?.ajax?.action || '',
			sub_action: 'save',
			hideFromSearch: siteVisibilityValues?.hideFromSearch,
			restrictAccess: siteVisibilityValues?.restrictAccess,
			password: siteVisibilityValues?.password,
			...formData,
		});

		handleActionRequest(data)
			.then((response: any) => {
				if (response === 'success') {
					// Find 'site-visibility' card and set it to 'completed'
					const cards = siteSettingsState?.cards?.map((card) => {
						if (card?.id === 'site-visibility') {
							// eslint-disable-next-line no-unused-expressions
							card.chipText = siteVisibilityValues?.hideFromSearch ? 'Hidden' : 'Visible';
							card.chipBackground = siteVisibilityValues?.hideFromSearch ? 'error' : 'success';
						}
						return card;
					});

					setSiteSettingsState({
						...siteSettingsState,
						cards,
					});
				}
			})
			.catch((error) => console.log(error));
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
