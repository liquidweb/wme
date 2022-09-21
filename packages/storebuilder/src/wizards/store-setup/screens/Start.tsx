import React from 'react';
import { WizardSectionTitle } from '@stellarwp/wme-ui';
import ScreenWrapper from '@setup/ScreenWrapper';
import { FtcStringData } from '@setup/data/constants';
import { IMAGE_DIR } from '@store/constants';

const { start } = FtcStringData;

const Start = () => (
	<ScreenWrapper sx={ { maxWidth: 515 } }>
		<WizardSectionTitle
			bookend
			copy={ start.description }
			heading={ start.title }
			headingVariant="h1"
			iconAlt={ start.title }
			iconSrc={ `${ IMAGE_DIR }rocket-icon.png` }
			sx={ {
				img: {
					maxWidth: '75px'
				},
				'& .WmeWizardSectionTitleHeading': {
					fontSize: '48px'
				}
			} }
		/>
	</ScreenWrapper>
);

export default Start;
