import { useEffect, useState } from 'react';
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
		<Box sx={ { maxWidth: 828 } }>
			<Typography
				variant="h3"
				mb={ 2 }>
				{ heading }
			</Typography>
			<NextStepTile variant="horizontal">
				<Box sx={ { borderRadius: '8px', overflow: 'hidden', display: 'inline-flex' } }>
					<img width="120" src={ nextStepImage } alt={ nextStepImageAlt } />
				</Box>
				<Box sx={ {
					display: 'flex',
					alignItems: 'center',
					gap: theme.spacing(3)
				} }>
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
					</Box>
					<Button
						onClick={ () => window.location.href = PAYMENTS_STRIPE_PROPS?.plugin?.adminUrl }
						variant="contained"
						sx={ { backgroundColor: 'text.primary', whiteSpace: 'nowrap' } }>
						{ manageBtnText }
					</Button>
				</Box>
			</NextStepTile>
		</Box>
	);
};

export default Success;
