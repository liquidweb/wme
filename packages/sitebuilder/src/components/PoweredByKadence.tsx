import React from 'react';
import { Box, Typography } from '@mui/material';
import { __ } from '@wordpress/i18n';
import { IMAGE_DIR } from '@sb/constants';

export const PoweredByKadence = () => {
	const POWERED_BY = __('Powered by Kadence', 'nexcess-mapps');
	const kadenceLogo = `${ IMAGE_DIR }kadence-icon.svg`;
	const kadenceAlt = 'kadence logo';

	return (
		<Box sx={ {
			paddingBottom: '95px',
			alignSelf: 'center',
			display: 'flex',
		} }>
			{ <img src={ kadenceLogo } alt={ kadenceAlt } /> }
			<Typography sx={ {
				paddingLeft: '7px',
				fontSize: '10px',
			} }>
				{ POWERED_BY }
			</Typography>
		</Box>
	);
};
