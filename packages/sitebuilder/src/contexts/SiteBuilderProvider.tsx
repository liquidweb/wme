import React, { createContext, useEffect, useState } from 'react';
import { GO_LIVE_PROPS } from '@sb/constants';

export interface SiteBuilderStateInterface {
	capturedDomain?: string;
	kadenceTemplate?: string;
	scrollPosition: number;
}

export interface SiteBuilderContextInterface {
	siteBuilderState: SiteBuilderStateInterface;
	setSiteBuilderState: (props: any) => void;
}

export const SiteBuilderContext = createContext<SiteBuilderContextInterface | null>(null);

const localData: SiteBuilderStateInterface = {
	capturedDomain: '',
	kadenceTemplate: '',
	scrollPosition: 0
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

	useEffect(() => {
		const handleScroll = () => {
			setSiteBuilderState({
				...siteBuilderState,
				scrollPosition: window.scrollY
			});

			console.log('window.scrollY', window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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
