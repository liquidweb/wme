import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface NavNumberProps {
  number?: number,
  text?: string,
  onClick: () => void,
  active?: boolean,
  isComplete?: boolean,
}

const StyledNavBlock = styled(Box, {
  name: 'WmeNavBlock',
  slot: 'Root',
})<NavNumberProps>(({ theme, active, isComplete }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& .MuiBox-root': {
    // eslint-disable-next-line max-len
    backgroundColor: (active || isComplete) ? theme.palette.primary.main : theme.palette.text.disabled,
  },
  '& .MuiTypography-root': {
    color: (active || isComplete) ? theme.palette.text.primary : theme.palette.text.disabled,
    '&:hover, &:focus': {
      textDecoration: 'underline',
      color: theme.palette.text.primary,
    },
  },
}));

const StyledCircle = styled(Box, {
  name: 'WmeNavNumber',
  slot: 'Root',
})(({ theme }) => ({
  fontSize: '10px',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '18px',
  height: '18px',
  marginRight: '6px',
}));

const StyledText = styled(Typography, {
  name: 'WmeNavText',
  slot: 'Root',
})(() => ({
  fontSize: '12px',
  lineHeight: '24px',
}));

const NavNumber: React.FC<NavNumberProps> = (props) => {
  const {
    number,
    text,
    ...rest
  } = props;

  return (
    <StyledNavBlock {...rest}>
      <StyledCircle>
        {
          // eslint-disable-next-line react/destructuring-assignment
          props.isComplete
            ? <CheckIcon sx={{ width: '14px' }} />
            : number
        }
      </StyledCircle>
      <StyledText>
        {text}
      </StyledText>
    </StyledNavBlock>
  );
};

export default NavNumber;
