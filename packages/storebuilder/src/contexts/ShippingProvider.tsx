import React, { createContext, useState } from 'react';
import ShippingScreenData, {
	ShippingScreenDataInterface
} from '@shipping/data/shipping-screen-data';
import { ShippingStringData } from '@shipping/data/constants';
import { Confirmation, Error } from '@shipping/screens';
import { handleActionRequest, removeNulls } from '@moderntribe/wme-utils';

export interface ShippingProviderContextInterface {
	shippingState: ShippingScreenDataInterface;
	setIsLoading: (isLoading: boolean) => void;
	setShippingProviders: (providers: string[]) => void;
	setProvidersActivated: (providersActivated: boolean) => void;
	activateShippingProviderPlugins: () => void;
}

const { buttonFinish } = ShippingStringData;
const shippingData = ShippingScreenData();

export const ShippingContext = createContext<
	ShippingProviderContextInterface | ShippingScreenDataInterface | null
>(shippingData);

const ShippingProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [shippingState, setShippingState] = useState<ShippingScreenDataInterface>(shippingData);

	const setShippingProviders = (providers: string[]) => {
		const { steps } = shippingState;
		steps[ 0 ].disableNext = providers.length === 0;

		setShippingState({
			...shippingState,
			steps,
			shippingProviders: providers,
		});
	};

	const setProvidersActivated = (providersActivated: boolean) => {
		setShippingState({
			...shippingState,
			providersActivated
		});
	};

	const handleError = () => {
		const { steps } = shippingState;
		steps[ 0 ].screen = <Error />;
		steps[ 0 ].disableNext = true;

		setShippingState({
			...shippingState,
			error: true,
			isLoading: false,
			steps
		});
	};

	const handleSuccess = () => {
		const { steps } = shippingState;
		steps[ 0 ].completed = true;
		steps[ 0 ].disableNext = false;
		steps[ 0 ].nextText = buttonFinish;
		steps[ 0 ].screen = <Confirmation />;

		setShippingState({
			...shippingState,
			steps,
			error: false,
			isLoading: false,
			providersActivated: true,
		});
	};

	const activateShippingProviderPlugins = () => {
		const { shippingProviders } = shippingState;

		setShippingState({
			...shippingState,
			isLoading: true,
		});

		const data = removeNulls({
			_wpnonce: shippingState?.ajax?.nonce ? shippingState.ajax.nonce : '',
			action: shippingState?.ajax?.action ? shippingState.ajax.action : '',
			sub_action: 'install',
			shippingProviders
		});

		handleActionRequest(data)
			.then(() => handleSuccess())
			.catch(() => handleError());
	};

	const setIsLoading = (isLoading: boolean) => {
		setShippingState({
			...shippingState,
			isLoading
		});
	};

	return (
		<ShippingContext.Provider
			value={ {
				shippingState,
				setIsLoading,
				setShippingProviders,
				setProvidersActivated,
				activateShippingProviderPlugins
			} }
		>
			{ children }
		</ShippingContext.Provider>
	);
};

export default ShippingProvider;
