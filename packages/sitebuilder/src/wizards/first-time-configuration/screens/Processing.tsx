import { ProgressBar } from '@moderntribe/wme-ui';
import { Box, Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { IMAGE_DIR } from '@sb/constants';
import { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
const { processing: processingStep } = FtcStringData;

const Processing = () => {
	// const { goToNextStep } = useWizard();
	const { submitForm } = useFirstTimeConfiguration();

	const [percentDone, setPercentDone] = useState(0);

	const updateProgress = () => {
		if (percentDone < 100) {
			setTimeout(() => {
				setPercentDone(percentDone + 10);
			}, 500);
		} else {
			submitForm();
		}
	};

	useEffect(() => {
		updateProgress();
	}, [percentDone]);

	return (
		<PageWrapper>
			<Stack spacing={ 3 }>
				<Box
					sx={ {
						width: '181px',
						margin: 'auto'
					} }
				>
					<img
						src={ `${ IMAGE_DIR }processing_image.png` }
						alt="placeholder site"
					/>
				</Box>
				<Typography component="h3" align="center" variant="h3">
					{ processingStep.title }
				</Typography>
				<ProgressBar
					color="primary"
					statusMessage={ processingStep.statusMessage }
					value={ percentDone }
				/>
				<Box component="div" sx={ { maxWidth: 415, padding: '0 64px' } }>
					<Typography align="center" variant="body2">
						{ processingStep.description }
					</Typography>
				</Box>
			</Stack>
		</PageWrapper>
	);
};

export default Processing;
