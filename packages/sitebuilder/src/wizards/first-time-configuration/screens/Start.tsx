import { WizardSectionTitle } from '@moderntribe/wme-ui';
import ScreenWrapper from '@ftc/ScreenWrapper';
import { FtcStringData } from '@ftc/data/constants';
import { IMAGE_DIR } from '@sb/constants';

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
