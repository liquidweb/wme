import React from 'react';
import { SetupCardTaskCta } from '@moderntribe/wme-ui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

export interface LaunchShippingWizardInterface {
	id: string;
	type: 'launch-shipping-wizard';
}

const LaunchShippingWizard = () => {
	const navigate = useNavigate();
	const handleOnClick = () => {
		navigate('/wizard/shipping');
	};

	return <SetupCardTaskCta
		sx={ { marginTop: 3 } }
		fullWidth={ true }
		startIcon={ <AddCircleOutlineIcon /> }
		onClick={ handleOnClick }
	>{ __('Add another way to ship', 'nexcess-mapps') }</SetupCardTaskCta>;
};

export default LaunchShippingWizard;
