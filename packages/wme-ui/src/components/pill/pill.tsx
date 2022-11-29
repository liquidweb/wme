import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export interface WmePillProps {
  active?: boolean;
  label: string;
  onClick: (target: string, active: boolean) => void;
}

const StyledPill = styled(MuiChip, {
  name: 'WmePill',
  slot: 'Root',
})<ChipProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.grey,
  color: theme.palette.text.primary,
  cursor: 'pointer',
  marginBottom: theme.spacing(1),

  '&.MuiChip-filledSecondary': {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.white,
  },
}));

export default function Pill(props: WmePillProps) {
  const { active, label, onClick } = props;
  const [isActive, setActive] = React.useState(active);

  useEffect(() => {
    if (active !== undefined) {
      setActive(active);
    }
  }, [active]);

  const handleClick = () => {
    const newState = !isActive;

    setActive(newState);
    if (onClick) {
      onClick((label || ''), newState);
    }
  };

  return (
    <StyledPill className="WmePill-root" label={label} color={isActive ? 'secondary' : undefined} onClick={handleClick} />
  );
}
