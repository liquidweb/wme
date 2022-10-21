import React, { createContext, useState } from 'react';

export interface StoreBuilderStateInterface {
	scrollPosition: number;
}

export interface StoreBuilderContextInterface {
	storeBuilderState: StoreBuilderStateInterface;
	setStoreBuilderState: (props: any) => void;
	setScrollPosition: (scrollPosition: number) => void;
}

export const StoreBuilderContext = createContext<StoreBuilderContextInterface | null>(null);

const localData: StoreBuilderStateInterface = {
	scrollPosition: 0
};

const storeBuilderData = (): StoreBuilderStateInterface => {
	return Object.assign(
		{},
		localData
	);
};

const StoreBuilderProvider = ({ children }: { children: React.ReactNode }) => {
	const [storeBuilderState, setStoreBuilderState] = useState<StoreBuilderStateInterface>(storeBuilderData);

	const setScrollPosition = (scrollPosition: number) => {
		setStoreBuilderState({
			...storeBuilderState,
			scrollPosition
		});
	};

	return (
		<StoreBuilderContext.Provider
			value={ {
				storeBuilderState,
				setStoreBuilderState,
				setScrollPosition
			} }
		>
			{ children }
		</StoreBuilderContext.Provider>
	);
};

export default StoreBuilderProvider;
