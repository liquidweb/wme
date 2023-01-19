import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Button } from '@moderntribe/wme-ui';
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
	} } = paymentsStripeConsts;
	const theme = useTheme();
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
		<Box sx={ { maxWidth: 678 } }>
			<Typography
				variant="h4"
				mb={ 3 }>
				{ heading }
			</Typography>
			<NextStepTile variant="horizontal">
				<Box sx={ {
					borderRadius: '8px',
					overflow: 'hidden',
					display: 'inline-flex',
					filter: 'drop-shadow(0px 0px 32px rgba(0, 0, 0, 0.1))'
				} }>
					<img width="180" src={ nextStepImage } alt={ nextStepImageAlt } />
				</Box>
				<Box>
					<Typography
						variant="h3"
						component="h3"
						mb={ 2 }
						sx={ {
							fontWeight: 500,
							maxWidth: '290px',
							letterSpacing: '-0.05em',
							color: theme.palette.text.primary,
						} }>
						{ manageTitleText }
					</Typography>
					<Typography
						variant={ 'body2' }
						mb={ 2 }
						sx={ {
							maxWidth: '380px',
						} }>
						{ copy }
					</Typography>
					<Button
						onClick={ () => window.location.href = PAYMENTS_STRIPE_PROPS?.plugin?.adminUrl }
						variant="contained">
						{ manageBtnText }
					</Button>
				</Box>
			</NextStepTile>
		</Box>
	);
};

export default Success;
