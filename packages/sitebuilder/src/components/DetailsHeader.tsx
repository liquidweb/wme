import React from 'react';
import { Box } from '@mui/material';
import { StoreBuilderLogo } from '@sb/logos';
import { Button } from '@moderntribe/wme-ui';

const DetailsHeader = () => {
	const handleClick = () => {
		alert('This does nothing - what should be here?');
	};

	return (
		<Box sx={ { display: 'flex', justifyContent: 'space-between', marginBottom: '64px' } }>
			<StoreBuilderLogo />
			<Box sx={ { display: 'flex', gap: '8px' } }>
				<Button variant="text" onClick={ handleClick }>Action CTA</Button>
				<Button variant="contained" color="primary" onClick={ handleClick }>Add functionality</Button>
			</Box>
		</Box>
	);
};

export { DetailsHeader };
