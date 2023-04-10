import { createContext, useState } from 'react';

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
	kadenceTemplate: '',
	scrollPosition: 0
};

const siteBuilderData = (): SiteBuilderStateInterface => {
	return {
		...localData,
	};
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
