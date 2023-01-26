import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Button } from '@moderntribe/wme-ui';
import { NextStepTile } from '@store/components';
import { paymentsPaypalConsts } from '../data/constants';
import { PAYMENTS_PAYPAL_PROPS, IMAGE_DIR, PAYPAL_PLUGIN_SLUG } from '@store/constants';
import { handleTelemetryRequest } from '@store/utils/handleTelemetryRequest';

const Success = () => {
	const [successScreenTouched, setSuccessScreenTouched] = useState<boolean>(false);
	const { success: {
		heading,
		manageBtnText,
		manageTitleText,
		copy,
	} } = paymentsPaypalConsts;
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
					<img width="180" src={ nextStepImage } alt={ manageTitleText } />
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
						onClick={ () => window.location.href = PAYMENTS_PAYPAL_PROPS?.plugin?.adminUrl }
						variant="contained">
						{ manageBtnText }
					</Button>
				</Box>
			</NextStepTile>
		</Box>
	);
};

export default Success;
