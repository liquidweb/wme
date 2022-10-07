import React, { createContext, useState } from 'react';
import ShippingScreenData, {
	ShippingScreenDataInterface
} from '@shipping/data/shipping-screen-data';
import { Confirmation, Error } from '@shipping/screens';
import { handleActionRequest, removeNulls } from '@store/utils';

export interface ShippingProviderContextInterface {
	shippingState: ShippingScreenDataInterface;
	setIsLoading: (isLoading: boolean) => void;
	setShippingProviders: (providers: string[]) => void;
	setProvidersActivated: (providersActivated: boolean) => void;
	submitProvidersAndActivate: () => void;
}

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

	const submitProvidersAndActivate = () => {
		const { steps, shippingProviders } = shippingState;

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

		handleActionRequest(data).then(() => {
			steps[ 0 ].completed = true;
			steps[ 0 ].disableNext = false;
			steps[ 0 ].screen = <Confirmation />;

			setShippingState({
				...shippingState,
				steps,
				error: false,
				isLoading: false,
				providersActivated: true,
			});
		}).catch(() => handleError());
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
				submitProvidersAndActivate
			} }
		>
			{ children }
		</ShippingContext.Provider>
	);
};

export default ShippingProvider;
