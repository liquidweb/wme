import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProgressBar } from '@stellarwp/wme-ui';
import { useLookAndFeel, useWizard } from '@sb/hooks';
import { randomInt } from '@sb/utils';
import { lookAndFeelConsts } from '@look-and-feel/data/constants';

const Import = () => {
	const { lookAndFeelState: { importingError, isImporting, importDone } } = useLookAndFeel();
	const { setShowDeviceHeader } = useWizard();
	const [progress, setProgress] = useState(5);
	const [counter, setCounter] = useState(0);
	const { importScreen: { heading, text, messages, finished, errorMessage } } = lookAndFeelConsts;
	const [waitingText, setWaitingText] = useState(messages[ 0 ]);

	useEffect(() => {
		setShowDeviceHeader(false);

		if (! isImporting) {
			setWaitingText(finished);
			setProgress(100);
			return;
		}

		if (importingError) {
			setProgress(progress);
			setWaitingText(errorMessage);
			return;
		}
		// the AJAX call can be very slow...this should give a fairly accurate display of progress.
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 88 ? prevProgress : prevProgress + randomInt(3, 11)));
		}, 5000);
		const messageTimer = setInterval(() => {
			if (counter < messages.length) {
				setWaitingText(messages[ counter ]);
				setCounter((prevCounter) => prevCounter + 1);
			}
		}, 10000);
		return () => {
			clearInterval(timer);
			clearInterval(messageTimer);
		};
	}, [counter, importDone, importingError]);

	return (
		<Box sx={ {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		} }>
			{ /* <Box>
				<img src={ paletteImg } alt="palette" />
			</Box> */ }
			<Typography sx={ {
				fontSize: '48px',
				// TODO: update color
				color: 'text.heading',
			} }>
				{ heading }
			</Typography>
			<Box sx={ {
				mb: '32px',
				width: '100%',
			} }>
				<ProgressBar statusMessage={ waitingText } value={ progress } />
			</Box>
			<Typography sx={ {
				maxWidth: '550px',
				textAlign: 'center',
				fontSize: '16px',
			} }>
				{ text }
			</Typography>
		</Box>
	);
};

export default Import;
