import React, { ReactElement, ReactNode } from 'react';
import {
  Box,
  BoxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface DeviceSelectionProps extends BoxProps {
  devices: Array<{
    name: string;
    icon: ReactElement,
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    active?: boolean;
  }>
}

const DeviceSelectionContainer = styled(Box, {
  name: 'WmeDeviceSelectionContainer',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const DEVICE_SX = {
  active: {
    color: 'primary.dark',
    mx: '5px',
  },
  default: {
    color: '#BFBFBF',
    cursor: 'pointer',
    mx: '5px',
  },
};

const DeviceSelection: React.FC<DeviceSelectionProps> = (props) => {
  const { devices } = props;

  return (
    <DeviceSelectionContainer>
      { devices.map((device, key) => {
        const DeviceName:any = devices[key].icon;
        return (
          <DeviceName
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            sx={device.active ? DEVICE_SX.active : DEVICE_SX.default}
            onClick={device.onClick}
          />
        );
      })}
    </DeviceSelectionContainer>
  );
};

export default DeviceSelection;
