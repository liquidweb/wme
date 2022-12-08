import { Box, Typography } from '@mui/material';
import { IMAGE_DIR } from '@store/constants';

import { ShippingStringData } from '@shipping/data/constants';

const Confirmation = () => {
	const { confirmation: {
		title,
		descriptionPart1,
		descriptionPart2,
		descriptionPart3
	}, addShippingMethod: {
		card2
	} } = ShippingStringData;

	return (
		<Box sx={ { maxWidth: 560 } }>
			<Box
				component="img"
				sx={ {
					display: 'block',
					width: '102px',
					height: '64px',
					mb: 3,
					mx: 'auto',
				} }
				src={ `${ IMAGE_DIR }${ card2.img.full }` }
				alt={ card2.img.alt }
			/>
			<Typography
				variant="h2"
				align="center"
				maxWidth="485px"
				mx="auto"
			>
				{ title }
			</Typography>
			<Typography
				variant="body1"
				component="p"
				mx="auto"
				my={ 3 }
				align="center"
				maxWidth="464px"
			>
				{ `${ descriptionPart1 } ` }
				<Typography component="i" fontWeight="600">{ descriptionPart2 }</Typography>
				{ ` ${ descriptionPart3 }` }
			</Typography>
		</Box>
	);
};

export default Confirmation;
