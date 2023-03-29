import { Box, SvgIcon } from '@mui/material';
import { DesktopWindows, TabletMac, PhoneIphone } from '@mui/icons-material';
import { useWizard } from '@sb/hooks';

export interface DeviceInterface {
		icon: typeof SvgIcon;
		width: string;
}

export interface DevicesInterface {
	desktop: DeviceInterface;
	tablet: DeviceInterface;
	mobile: DeviceInterface;
}

const devices:DevicesInterface = {
	desktop: {
		icon: DesktopWindows,
		width: '100%',
	},
	tablet: {
		icon: TabletMac,
		width: '768px',
	},
	mobile: {
		icon: PhoneIphone,
		width: '480px',
	},
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

const wrapperSx = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 1,
};

export const ModalDeviceSelection = () => {
	const { setActiveDevice, wizardState: { activeDevice } } = useWizard();

	const handleDeviceClick = (nextDevice: keyof DevicesInterface) => {
		if (nextDevice === activeDevice.breakpoint) {
			return;
		}
		setActiveDevice({
			breakpoint: nextDevice,
			width: devices[ nextDevice ].width
		});
	};

	return <Box sx={ wrapperSx }>
		{ (Object.keys(devices) as Array<keyof typeof devices>).map((key: keyof DevicesInterface) => {
			const DeviceName = devices[ key ].icon;
			return <DeviceName
				key={ key }
				sx={ activeDevice.breakpoint === key ? deviceSx.active : deviceSx.default }
				onClick={ () => handleDeviceClick(key) }
			/>;
		}) }
	</Box>;
};
