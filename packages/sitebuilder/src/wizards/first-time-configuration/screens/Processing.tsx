import { ProgressBar } from '@moderntribe/wme-ui';
import { Box, Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { IMAGE_DIR } from '@sb/constants';
import { useEffect, useState } from 'react';
const { processing } = FtcStringData;

const Processing = () => {
	const { submitForm } = useFirstTimeConfiguration();
	const { processing } = FtcStringData;

	const [percentDone, setPercentDone] = useState(0);

	const updateProgress = () => {
		if (percentDone < 100) {
			setTimeout(() => {
				setPercentDone(percentDone + 10);
			}, 400);
		} else {
			submitForm();
		}
	};

	useEffect(() => {
		updateProgress();
	}, [percentDone]);

	return (
		<Box sx={ { maxWidth: 560, width: 560 } }>
			<Stack spacing={ 3 }>
				<Box
					sx={ {
						width: '181px',
						margin: 'auto'
					} }
				>
					<img src={ `${ IMAGE_DIR }processing_image.png` } />
				</Box>
				<Typography component="h3" align="center" variant="h3">
					{ processing.title }
				</Typography>
				<ProgressBar
					color="primary"
					statusMessage={ processing.statusMessage }
					value={ percentDone }
				/>
				<Box component="div" sx={ { maxWidth: 415, padding: '0 64px' } }>
					<Typography align="center" variant="body2">
						{ processing.description }
					</Typography>
				</Box>
			</Stack>
		</Box>
	);
};

export default Processing;
