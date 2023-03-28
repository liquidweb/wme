import { Box } from '@mui/material';
import IframeEmbed from '@ftc/components/IframeEmbed';
import { useRef } from 'react';

const StyleReview = () => {

	return (
		// Padding/margin doesn't take effect here - using a percent width instead
		<Box sx={ { width: '95%' } }>
			<IframeEmbed src={window.location.origin} />
		</Box>
	);
};

export default StyleReview;
