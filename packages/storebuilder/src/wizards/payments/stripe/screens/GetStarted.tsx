import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { WizardSectionTitle } from '@stellarwp/wme-ui';
import { paymentsStripeConsts } from '../data/constants';
import { IMAGE_DIR } from '@store/constants';

// PayPal Get Started Wizard screen
const GetStarted = () => {
	const theme = useTheme();
	const { getStarted: { heading, copy, terms, stripeAlt } } = paymentsStripeConsts;
	const stripeIcon = `${ IMAGE_DIR }stripe-logo.png`;

	return (
		<Box sx={ { maxWidth: 500 } }>
			<WizardSectionTitle
				iconSrc={ stripeIcon }
				iconAlt={ stripeAlt }
				heading={ heading }
				headingVariant={ 'h2' }
				copy={ copy }
				bookend={ true }
				sx={ { mb: theme.spacing(4) } }
			/>
			<Box sx={ { textAlign: 'center' } }>
				<Typography
					color="text.disabled"
					sx={ { fontSize: '10px' } }
				>
					{ terms }
				</Typography>
			</Box>
		</Box>
	);
};

export default GetStarted;
