import { useEffect, useState } from 'react';
import { Box, useTheme, CircularProgress, Stack } from '@mui/material';
import { WizardSectionTitle, Form, FormField, TextInput } from '@moderntribe/wme-ui';
import { usePaymentsStripe } from '@store/hooks';
import { paymentsStripeConsts } from '../data/constants';
import { PAYMENTS_STRIPE_PROPS } from '@store/constants';
import { handleActionRequest } from '@moderntribe/wme-utils';

interface ApiKeysInterface {
	publishable: string;
	secret: string;
}

// PayPal Account Keys Wizard screen
const AccountKeys = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { paymentsStripeState: { keys }, setStripeKeys, setError } = usePaymentsStripe();
	const stripeNonce = PAYMENTS_STRIPE_PROPS.ajax.nonce || '';
	const stripeAction = PAYMENTS_STRIPE_PROPS.ajax.action || '';
	const { accountKeys: {
		heading,
		copy,
		livePublishableKey,
		liveSecretKey,
		livePublishableHelper,
		liveSecretHelper
	} } = paymentsStripeConsts;
	const theme = useTheme();

	useEffect(() => {
		const fetchKeys = async () => {
			// eslint-disable-next-line no-unused-vars
			const data = {
				_wpnonce: stripeNonce,
				action: stripeAction,
				sub_action: 'get_keys',
			};

			const response = await handleActionRequest(data) as ApiKeysInterface;
			const { publishable, secret } = response;
			if (! publishable || ! secret) {
				setError(true);
			} else {
				setStripeKeys(publishable, secret);
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
					? 		<Form>
						<Stack spacing={ 2 }>
							<FormField
								field={ <TextInput
									fullWidth
									readOnly
									value={ keys.publishable }
									sx={ { '& .MuiInputBase-input': { pr: '6px' } } }
								/> }
								label={ livePublishableKey }
								helperText={ livePublishableHelper }
							/>
							<FormField
								field={ <TextInput
									fullWidth
									readOnly
									value={ keys.secret }
									sx={ { '& .MuiInputBase-input': { pr: '6px' } } }
								/> }
								label={ liveSecretKey }
								helperText={ liveSecretHelper }
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
