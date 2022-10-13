import React from 'react';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import ScreenWrapper from '@setup/ScreenWrapper';
import { StoreSetupStringData } from '@setup/data/constants';
import { IMAGE_DIR } from '@store/constants';

const Complete = () => {
	const { complete: {
		title,
		copy
	} } = StoreSetupStringData;

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				bookend
				heading={ title }
				copy={ copy }
				headingVariant="h2"
				iconAlt={ title }
				iconSrc={ `${ IMAGE_DIR }ftc-complete.png` }
				sx={ {
					img: {
						maxWidth: '86px',
					}
				} }
				width="425px"
			/>
		</ScreenWrapper>
	);
};

export default Complete;
