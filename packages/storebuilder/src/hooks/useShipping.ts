import { useContext } from 'react';
import {
	ShippingContext,
	ShippingProviderContextInterface
} from '@store/contexts/ShippingProvider';

export function useShipping() {
	const {
		shippingState,
		setIsLoading,
		setShippingProviders,
		setProvidersActivated,
		activatePlugins
	} = useContext(ShippingContext) as ShippingProviderContextInterface;
	return {
		shippingState,
		setIsLoading,
		setShippingProviders,
		setProvidersActivated,
		activatePlugins
	};
}
