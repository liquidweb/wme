import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { WizardSectionTitle, Button } from '@moderntribe/wme-ui';
import { NextStepTile } from '@store/components';
import { paymentsPaypalConsts } from '../data/constants';
import { PAYMENTS_PAYPAL_PROPS, IMAGE_DIR, PAYPAL_PLUGIN_SLUG } from '@store/constants';
import { handleTelemetryRequest } from '@store/utils/handleTelemetryRequest';

const Success = () => {
	const [successScreenTouched, setSuccessScreenTouched] = useState<boolean>(false);
	const { success: {
		heading,
		copy,
		manageBtnText,
		manageTitleText,
		imageAlt
	}, getStarted: { paypalAlt } } = paymentsPaypalConsts;
	const paypalIcon = `${ IMAGE_DIR }paypal-logo.png`;
	const nextStepImage = `${ IMAGE_DIR }manage-payment-settings-paypal.png`;

	const theme = useTheme();

	useEffect(() => {
		if (! successScreenTouched) {
			setSuccessScreenTouched(true);
			const nonce = PAYMENTS_PAYPAL_PROPS?.ajax.nonce;
			const action = PAYMENTS_PAYPAL_PROPS?.ajax.action;
			handleTelemetryRequest(nonce, action, PAYPAL_PLUGIN_SLUG, 'wizard_completed');
		}
	}, []);

	return (
		<Box sx={ { maxWidth: 500 } }>
			<WizardSectionTitle
				heading={ heading }
				headingVariant={ 'h2' }
				copy={ copy }
				iconSrc={ paypalIcon }
				iconAlt={ paypalAlt }
				bookend={ true }
			/>
			<NextStepTile>
				<img width="200" src={ nextStepImage } alt={ imageAlt } />
				<Typography
					variant="h3"
					component="h3"
					mb={ 2 }
					sx={ {
						fontWeight: 500,
						maxWidth: '190px',
						letterSpacing: '-0.05em',
						marginTop: theme.spacing(4),
						color: theme.palette.text.primary,
					} }
					align={ 'center' }>
					{ manageTitleText }
				</Typography>
				<Button
					onClick={ () => window.location.href = PAYMENTS_PAYPAL_PROPS?.plugin?.adminUrl }
					variant="contained"
					sx={ { backgroundColor: 'primary.dark' } }
				>
					{ manageBtnText }
				</Button>
			</NextStepTile>
		</Box>
	);
};

export default Success;
