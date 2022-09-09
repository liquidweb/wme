import React from 'react';
import { Box, SvgIcon } from '@mui/material';
import { DesktopWindows, TabletMac, PhoneIphone } from '@mui/icons-material';
import { useWizard } from '../hooks/useWizard';

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

const devicesOffsetSx = {
	marginRight: '-20.833333%',
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
	const { currentStep, setActiveDevice, wizardState: { activeDevice } } = useWizard();

	// If it's the template selection screen or import screen, just return right away
	if (currentStep === 1 || currentStep === 5) {
		return null;
	}

	const handleDeviceClick = (nextDevice: string) => {
		if (nextDevice === activeDevice) {
			return;
		}
		setActiveDevice(nextDevice);
	};

	return <Box sx={ { display: 'flex', alignItems: 'center', ...(currentStep !== 3 && devicesOffsetSx) } }>
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
