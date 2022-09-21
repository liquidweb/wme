import React, { createContext, useState } from 'react';
import { GO_LIVE_PROPS } from '@store/constants';

export interface StoreBuilderStateInterface {
	placeholder?: string;
}

export interface StoreBuilderContextInterface {
	storeBuilderState: StoreBuilderStateInterface;
	setStoreBuilderState: (props: any) => void;
}

export const StoreBuilderContext = createContext<StoreBuilderContextInterface | null>(null);

const localData: StoreBuilderStateInterface = {
	placeholder: ''
};

const storeBuilderData = (): StoreBuilderStateInterface => {
	return Object.assign(
		{},
		localData,
		{ capturedDomain: GO_LIVE_PROPS.verifyingUrl }
	);
};

const StoreBuilderProvider = ({ children }: { children: React.ReactNode }) => {
	const [storeBuilderState, setStoreBuilderState] = useState<StoreBuilderStateInterface>(storeBuilderData);

	return (
		<StoreBuilderContext.Provider
			value={ {
				storeBuilderState,
				setStoreBuilderState,
			} }
		>
			{ children }
		</StoreBuilderContext.Provider>
	);
};

export default StoreBuilderProvider;
