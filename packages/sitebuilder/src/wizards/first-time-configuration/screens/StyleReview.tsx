import { Box } from '@mui/material';
import IframeEmbed from '@ftc/components/IframeEmbed';
import { useFirstTimeConfiguration, useWizard } from '@sb/hooks';
import { ModalDeviceSelection } from '@sb/components';

const deviceWrapperSx = {
	position: 'sticky',
	zIndex: 2,
	top: '15px',
	width: '400px',
	marginTop: '-42px',
	paddingBottom: '18px',
	display: 'flex',
	justifyContent: 'center',
	marginLeft: 'auto',
	marginRight: 'auto'
};

const StyleReview = () => {
	const {
		ftcState: { form }
	} = useFirstTimeConfiguration();
	const {
		wizardState: { activeDevice }
	} = useWizard();

	return (
		// Padding/margin doesn't take effect here - using a percent width instead
		<Box sx={ { width: '95%', height: '100%' } }>
			<Box sx={ deviceWrapperSx }>
				<ModalDeviceSelection />
			</Box>
			<IframeEmbed
				src={ window.location.origin }
				id={ form.template.value }
				width={ activeDevice.width ? activeDevice.width : '100%' }
			/>
		</Box>
	);
};

export default StyleReview;
