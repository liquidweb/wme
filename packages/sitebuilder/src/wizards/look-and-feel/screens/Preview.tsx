import React from 'react';
import { Box } from '@mui/material';
import IframeDisplay from '@look-and-feel/IframeDisplay';

const Preview = () => {
	return (
		<Box sx={ { width: '100%', height: '100%' } }>
			<IframeDisplay />
		</Box>
	);
};

export default Preview;
