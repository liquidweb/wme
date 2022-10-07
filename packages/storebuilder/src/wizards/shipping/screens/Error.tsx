import React from 'react';
import { __ } from '@wordpress/i18n';
import { Box, Typography, Link } from '@mui/material';
import { IMAGE_DIR, NEXCESS_SUPPORT_URL } from '@store/constants';
import { useShipping } from '@store/hooks';
import { ShippingStringData } from '@shipping/data/constants';

const Error = () => {
	const { error: {
		title,
		descriptionPart1,
		descriptionPart2,
		descriptionPart3,
		descriptionPart4
	} } = ShippingStringData;

	const { submitProvidersAndActivate } = useShipping();

	const handleClick = () => {
		submitProvidersAndActivate();
	};

	return (
		<Box sx={ { maxWidth: 560 } }>
			<Box
				component="img"
				sx={ {
					display: 'block',
					width: '64px',
					height: '64px',
					mb: 3,
					mx: 'auto',
				} }
				src={ `${ IMAGE_DIR }melting-emoji.png` }
				alt=""
			/>
			<Typography
				variant="h2"
				mx="auto"
				mb={ 3 }
				align="center"
				maxWidth="400px"
			>
				{ title }
			</Typography>
			<Typography
				variant="body1"
				mx="auto"
				mb={ 3 }
				align="center"
				maxWidth="464px"
			>
				{ descriptionPart1 }
				<Link onClick={ handleClick } sx={ { cursor: 'pointer' } }>{ descriptionPart2 }</Link>
			</Typography>
			<Typography
				variant="caption"
				mx="auto"
				align="center"
				maxWidth="464px"
				display="block"
				color="text.disabled"
			>
				{ descriptionPart3 }
				<Link href={ NEXCESS_SUPPORT_URL } underline="hover" target="_blank">{ descriptionPart4 }</Link>
			</Typography>
		</Box>
	);
};

export default Error;
