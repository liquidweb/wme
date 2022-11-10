import type React from 'react';
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';

export interface RadioGroupProps extends MuiRadioGroupProps {
  ariaLabelledby?: string;
}

const StyledRadioGroup = styled(MuiRadioGroup, {
  name: 'WmeRadioGroup',
  slot: 'Root',
})(({ theme }) => ({
  '&.MuiRadio-checked': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.secondary.dark,
    },
  },
  '&:focus, &:hover': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.secondary.dark,
    },
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.secondary.main,
  },
}));

const RadioGroup: React.FC<RadioGroupProps> = ({
  ariaLabelledby,
  children,
  ...props
}) => (
  <StyledRadioGroup
    aria-labelledby={ariaLabelledby}
    className="WmeRadioGroup-root"
    {...props}
  >
    {children}
  </StyledRadioGroup>
);

export default RadioGroup;
