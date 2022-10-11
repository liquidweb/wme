import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { IMAGE_DIR } from '@store/constants';
import { sharedPaymentScreensConst } from '@payments/shared-screens/data/constants';

interface PropsInterface {
	pluginName: string;
	supportLink: string;
}

const ErrorKeys = ({ pluginName, supportLink }: PropsInterface) => {
	const { errorKeys: {
		title,
		descriptionPart1,
		descriptionPart2,
		descriptionPart3,
		descriptionPart4
	}, shared: { meltingEmojiAlt } } = sharedPaymentScreensConst;
	const meltingEmoji = `${ IMAGE_DIR }melting-emoji.png`;

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
				src={ meltingEmoji }
				alt={ meltingEmojiAlt }
			/>
			<Typography
				variant="h2"
				mx="auto"
				mb={ 3 }
				align="center"
			>
				{ title }
			</Typography>
			<Typography
				variant="body1"
				mx="auto"
				mb={ 3 }
				align="center"
				maxWidth="500px"
			>
				{ descriptionPart1 }
				<Link href={ supportLink } sx={ { cursor: 'pointer' } }>{ pluginName + descriptionPart2 }</Link>
				{ descriptionPart3 + pluginName + descriptionPart4 }
			</Typography>
		</Box>
	);
};

export default ErrorKeys;
