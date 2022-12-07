import { useEffect, useState } from '@wordpress/element';
import { Box, useTheme, CircularProgress, Stack } from '@mui/material';
import { WizardSectionTitle, Form, FormField, TextInput } from '@moderntribe/wme-ui';
import { usePaymentsPaypal } from '@store/hooks';
import { paymentsPaypalConsts } from '../data/constants';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { PAYMENTS_PAYPAL_PROPS } from '@store/constants';

interface ApiKeysInterface {
	merchant_id: string;
	email_address: string;
	client_id: string;
}

// PayPal Account Keys Wizard screen
const AccountKeys = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { paymentsPaypalState: { keys }, setPaypalKeys, setError } = usePaymentsPaypal();
	const paypalNonce = PAYMENTS_PAYPAL_PROPS.ajax.nonce || '';
	const paypalAction = PAYMENTS_PAYPAL_PROPS.ajax.action || '';
	const { accountKeys: {
		heading,
		copy,
		liveEmailAddress,
		liveMerchantId,
		liveClientId,
		liveClientSecretKey
	} } = paymentsPaypalConsts;
	const theme = useTheme();

	useEffect(() => {
		const fetchKeys = async () => {
			const data = {
				_wpnonce: paypalNonce,
				action: paypalAction,
				sub_action: 'get_keys',
			};

			const response = await handleActionRequest(data) as ApiKeysInterface;
			if (! response?.merchant_id || ! response.client_id) {
				setError(true);
			} else {
				setPaypalKeys(
					response.email_address,
					response.merchant_id,
					response.client_id
				);
			}

			setIsLoading(false);
		};

		fetchKeys().catch((err) => {
			// eslint-disable-next-line no-console
			console.log(err.responseJSON.data[ 0 ].message);
			setError(true);
		});
	}, []);

	return (
		<Box sx={ { maxWidth: 500 } }>
			<WizardSectionTitle
				heading={ heading }
				headingVariant={ 'h2' }
				copy={ copy }
				sx={ { mb: theme.spacing(5) } }
			/>
			{
				! isLoading
					? <Form>
						<Stack spacing={ 2 }>
							<FormField
								field={ <TextInput fullWidth readOnly value={ keys.email } /> }
								label={ liveEmailAddress }
							/>
							<FormField
								field={ <TextInput fullWidth readOnly value={ keys.merchantId } /> }
								label={ liveMerchantId }
							/>
							<FormField
								field={ <TextInput fullWidth readOnly value={ keys.clientId } /> }
								label={ liveClientId }
							/>
							<FormField
								field={ <TextInput fullWidth type="password" value={ '********************' } /> }
								label={ liveClientSecretKey }
							/>
						</Stack>
					</Form>
					: <Box sx={ { textAlign: 'center' } }>
						<CircularProgress />
					</Box>
			}
		</Box>
	);
};

export default AccountKeys;
