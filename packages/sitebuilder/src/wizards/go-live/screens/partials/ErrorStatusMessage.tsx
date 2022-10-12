import React from 'react';
import { Typography } from '@mui/material';
import { Error } from '@mui/icons-material';

const ErrorStatusMessage = (props: { message: string }) => {
	const { message = '' } = props;

	return (
		<Typography variant="body2" fontWeight={ 500 } sx={ { display: 'flex', alignItems: 'center', marginBottom: 3 } }>
			<Error color="error" sx={ { marginRight: 1 } } />
			{ message }
		</Typography>
	);
};

export default ErrorStatusMessage;
