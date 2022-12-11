import { Box, SvgIcon } from '@mui/material';
import { DesktopWindows, TabletMac, PhoneIphone } from '@mui/icons-material';
import { useWizard } from '@sb/hooks';

interface DevicesInterface {
	desktop: typeof SvgIcon;
	tablet: typeof SvgIcon;
	mobile: typeof SvgIcon;
}

const devices:DevicesInterface = {
	desktop: DesktopWindows,
	tablet: TabletMac,
	mobile: PhoneIphone,
};

const deviceSx = {
	active: {
		color: 'primary.dark',
		mx: '5px',
	},
	default: {
		color: '#BFBFBF',
		cursor: 'pointer',
		mx: '5px',
	}
};

export const ModalDeviceSelection = () => {
	const { setActiveDevice, wizardState: { activeDevice } } = useWizard();

	const handleDeviceClick = (nextDevice: string) => {
		if (nextDevice === activeDevice) {
			return;
		}
		setActiveDevice(nextDevice);
	};

	return <Box sx={ { display: 'flex', alignItems: 'center' } }>
		{ (Object.keys(devices) as Array<keyof typeof devices>).map((key) => {
			const DeviceName = devices[ key ];
			return <DeviceName
				key={ key }
				sx={ activeDevice === key ? deviceSx.active : deviceSx.default }
				onClick={ () => handleDeviceClick(key) }
			/>;
		}) }
	</Box>;
};
