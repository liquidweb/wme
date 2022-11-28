import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack, StackProps, BoxProps, Box,
} from '@mui/material';
import { Pill, FormFieldLabel } from '..';

export interface PillType {
  label: string;
  active: boolean;
}

export interface WmePillGroupProps {
  label?: string;
  pills: PillType[],
  onSelect: (selectedPills: PillType[]) => void;
}

const StyledPillGroup = styled(Box, {
  name: 'WmePillGroup',
  slot: 'Root',
})<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .WmeFormFieldLabel-root': {
    marginBottom: theme.spacing(3),
  },
}));

const StyledPillWrapper = styled(Stack, {
  name: 'WmePillGroupWrapper',
  slot: 'Root',
})<StackProps>(() => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

export default function PillGroup(props: WmePillGroupProps) {
  const { pills, onSelect, label } = props;
  const [pillList, setPillList] = React.useState(pills || []);

  const handleClick = (target: string, active: boolean) => {
    const updatedStatus = pillList.map((pill) => {
      if (pill.label === target) {
        return { ...pill, active };
      }
      return pill;
    });
    setPillList(updatedStatus);
    onSelect(updatedStatus);
  };

  return (
    <StyledPillGroup className="WmePillGroup-root">
      {label && <FormFieldLabel>{label}</FormFieldLabel>}
      <StyledPillWrapper className="WmePillGroupWrapper-root" spacing={1} direction="row">
        {pillList.map((pill) => (
          <Pill label={pill.label} active={pill.active} onClick={handleClick} key={pill.label} />
        ))}
      </StyledPillWrapper>
    </StyledPillGroup>
  );
}
