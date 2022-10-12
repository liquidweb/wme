import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { IMAGE_DIR } from '@store/constants';
import { usePaymentsStripe } from '@store/hooks';
import { sharedPaymentScreensConst } from '@payments/shared-screens/data/constants';

interface PropsInterface {
	supportLink: string;
}

const ErrorPluginInstall = ({ supportLink }: PropsInterface) => {
	const { installPlugin } = usePaymentsStripe();
	const { errorPluginInstall: {
		title,
		descriptionPart1,
		descriptionPart2,
		descriptionPart3,
		descriptionPart4
	}, shared: { meltingEmojiAlt } } = sharedPaymentScreensConst;
	const meltingEmoji = `${ IMAGE_DIR }melting-emoji.png`;

	const handleRetry = () => {
		installPlugin();
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
				src={ meltingEmoji }
				alt={ meltingEmojiAlt }
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
				<Link onClick={ handleRetry } sx={ { cursor: 'pointer' } }>{ descriptionPart2 }</Link>
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
				<Link href={ supportLink } underline="hover" target="_blank">{ descriptionPart4 }</Link>
			</Typography>
		</Box>
	);
};

export default ErrorPluginInstall;
