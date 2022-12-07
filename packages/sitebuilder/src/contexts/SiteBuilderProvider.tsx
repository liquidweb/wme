import { createContext, useState } from '@wordpress/element';
import { GO_LIVE_PROPS } from '@sb/constants';

export interface SiteBuilderStateInterface {
	capturedDomain?: string;
	kadenceTemplate?: string;
	scrollPosition: number;
}

export interface SiteBuilderContextInterface {
	siteBuilderState: SiteBuilderStateInterface;
	setSiteBuilderState: (props: any) => void;
	setScrollPosition: (scrollPosition: number) => void;
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

	const setScrollPosition = (scrollPosition: number) => {
		setSiteBuilderState({
			...siteBuilderState,
			scrollPosition
		});
	};

	return (
		<SiteBuilderContext.Provider
			value={ {
				siteBuilderState,
				setSiteBuilderState,
				setScrollPosition
			} }
		>
			{ children }
		</SiteBuilderContext.Provider>
	);
};

export default SiteBuilderProvider;
