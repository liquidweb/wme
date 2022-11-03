import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProgressBar, WizardSectionTitle } from '@moderntribe/wme-ui';
import { randomInt } from '@moderntribe/wme-utils';
import { useLookAndFeel } from '@sb/hooks';
import { lookAndFeelConsts } from '@look-and-feel/data/constants';
import { IMAGE_DIR } from '@sb/constants';

const Import = () => {
	const { lookAndFeelState: { importingError, importDone } } = useLookAndFeel();
	const [progress, setProgress] = useState(5);
	const [counter, setCounter] = useState(0);
	const { importScreen: { heading, text, messages, finished, errorMessage, paletteAlt } } = lookAndFeelConsts;
	const [waitingText, setWaitingText] = useState(messages[ 0 ]);
	const paletteImg = `${ IMAGE_DIR }/palette.png`;

	useEffect(() => {
		if (importDone) {
			setWaitingText(finished);
			setProgress(100);
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
	}, [counter, importingError, importDone]);

	return (
		<Box sx={ {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		} }>
			<WizardSectionTitle
				bookend
				heading={ heading }
				headingVariant="h2"
				iconAlt={ paletteAlt }
				iconSrc={ paletteImg }
				width="425px"
			/>
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
