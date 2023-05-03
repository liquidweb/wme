import { Box, Typography } from '@mui/material';
import { SetupCards } from '@site/setup';
import { __ } from '@wordpress/i18n';
import SiteSettingsProvider	 from '@site/contexts/SiteSettingsProvider';

const SetupScreen = () => {
	return (
		<SiteSettingsProvider>
			<Box pt={ 4 } pl={ '12px' } pr={ 4 }>
				<Typography variant="h3" textAlign="center">
					{ __('Site Settings', 'moderntribe-sitebuilder') }
				</Typography>
				<SetupCards />
			</Box>
		</SiteSettingsProvider>
	);
};

export default SetupScreen;
