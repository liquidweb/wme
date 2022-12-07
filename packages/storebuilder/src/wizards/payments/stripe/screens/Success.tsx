import { useEffect, useState } from '@wordpress/element';
import { Box, Typography, useTheme } from '@mui/material';
import { WizardSectionTitle, Button } from '@moderntribe/wme-ui';
import { NextStepTile } from '@store/components';
import { paymentsStripeConsts } from '../data/constants';
import { IMAGE_DIR, PAYMENTS_STRIPE_PROPS, STRIPE_PLUGIN_SLUG } from '@store/constants';
import { handleTelemetryRequest } from '@store/utils/handleTelemetryRequest';

const Success = () => {
	const [successScreenTouched, setSuccessScreenTouched] = useState<boolean>(false);
	const { success: {
		heading,
		copy,
		manageBtnText,
		manageTitleText,
		nextStepImageAlt
	}, getStarted: { stripeAlt } } = paymentsStripeConsts;
	const theme = useTheme();
	const stripeIcon = `${ IMAGE_DIR }stripe-logo.png`;
	const nextStepImage = `${ IMAGE_DIR }manage-payment-settings.png`;

	useEffect(() => {
		if (! successScreenTouched) {
			setSuccessScreenTouched(true);
			const nonce = PAYMENTS_STRIPE_PROPS.ajax.nonce;
			const action = PAYMENTS_STRIPE_PROPS.ajax.action;
			handleTelemetryRequest(nonce, action, STRIPE_PLUGIN_SLUG, 'wizard_completed');
		}
	}, []);

	return (
		<Box sx={ { maxWidth: 500 } }>
			<WizardSectionTitle
				heading={ heading }
				headingVariant={ 'h2' }
				copy={ copy }
				iconSrc={ stripeIcon }
				iconAlt={ stripeAlt }
				bookend={ true }
			/>
			<NextStepTile>
				<img width="200" src={ nextStepImage } alt={ nextStepImageAlt } />
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
					onClick={ () => window.location.href = PAYMENTS_STRIPE_PROPS?.plugin?.adminUrl }
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
