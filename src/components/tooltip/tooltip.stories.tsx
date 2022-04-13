import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { styled } from '@mui/material/styles';
import Tooltip from './tooltip';

const StyledBox = styled(Box, {
  name: 'WmeStyledBox',
  slot: 'Root',
})(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '75px',
  marginTop: '100px',
  marginLeft: '250px',
}));

export default {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: ['top', 'left', 'right', 'bottom'],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args:any) => (
  <Tooltip {...args}>
    <StyledBox>
      <PowerSettingsNewIcon />
      <Box>Manage</Box>
    </StyledBox>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  title: 'tooltip',
};
