import React from 'react';
import ShippingWizard from '@shipping/ShippingWizard';
import ShippingProvider from '@store/contexts/ShippingProvider';

const Shipping = () => (
	<ShippingProvider>
		<ShippingWizard />
	</ShippingProvider>
);

export default Shipping;
