import { Box, Typography } from '@mui/material';
import { SetupCards } from '@site/setup';
import { __ } from '@wordpress/i18n';

const SetupScreen = () => {
	return (
		<Box pt={ 4 } pl={ '12px' } pr={ 4 }>
			<Typography variant="h3" textAlign="center">
				{ __('Site Settings', 'moderntribe-sitebuilder') }
			</Typography>
			<SetupCards />
		</Box>
	);
};

export default SetupScreen;
