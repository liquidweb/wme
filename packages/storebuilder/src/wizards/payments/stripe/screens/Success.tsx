import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { WizardSectionTitle, Button } from '@stellarwp/wme-ui';
import { NextStepTile } from '@store/components';
import { paymentsStripeConsts } from '../data/constants';
import { IMAGE_DIR, PAYMENTS_STRIPE_PROPS } from '@store/constants';

const Success = () => {
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
