import React, { createContext, useState } from 'react';
import { GO_LIVE_PROPS } from '@sb/constants';

export interface SiteBuilderStateInterface {
	capturedDomain?: string;
	kadenceTemplate?: string;
}

export interface SiteBuilderContextInterface {
	siteBuilderState: SiteBuilderStateInterface;
	setSiteBuilderState: (props: any) => void;
}

export const SiteBuilderContext = createContext<SiteBuilderContextInterface | null>(null);

const localData: SiteBuilderStateInterface = {
	capturedDomain: '',
	kadenceTemplate: ''
};

const siteBuilderData = (): SiteBuilderStateInterface => {
	return Object.assign(
		{},
		localData,
		{ capturedDomain: GO_LIVE_PROPS.verifyingUrl }
	);
};

const SiteBuilderProvider = ({ children }: { children: React.ReactNode }) => {
	const [siteBuilderState, setSiteBuilderState] = useState<SiteBuilderStateInterface>(siteBuilderData);

	return (
		<SiteBuilderContext.Provider
			value={ {
				siteBuilderState,
				setSiteBuilderState,
			} }
		>
			{ children }
		</SiteBuilderContext.Provider>
	);
};

export default SiteBuilderProvider;
