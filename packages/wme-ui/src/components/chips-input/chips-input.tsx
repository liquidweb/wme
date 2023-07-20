import React, { useState } from 'react';
import { InputBaseProps, styled, TextField } from '@mui/material';
import { Chip } from '..';

interface ChipsInputProps extends InputBaseProps {
  tags: string[];
  selectedTags: (arg: string[]) => void;
}

const StyledChipInput = styled(TextField, {
  name: 'WmeChipInput',
  slot: 'Root',
})(({ theme }) => ({
  maxWidth: '100%',
  width: '100%',
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.border.ui}`,
  padding: '8px 8px',
  position: 'relative',
  minHeight: '80px',
  borderRadius: 4,
  '& .MuiInputBase-root': {
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 3,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
  '& .MuiInputBase-input.MuiOutlinedInput-input': {
    border: 0,
    padding: 0,
    width: 'auto',
    height: '100%',
    '&:focus': {
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
      outline: 'none',
    },
    '&:disabled': {
      borderColor: theme.palette.background.disabled,
      backgroundColor: theme.palette.background.disabled,
      boxShadow: 'none',
    },
  },
}));

const ChipsInput: React.FC<ChipsInputProps> = ({ tags = [], selectedTags, ...rest }) => {
  const [inputValue, setInputValue] = useState('');

  const deleteChip = (item: string) => () => {
    const newSelectedItem = [...tags];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    selectedTags(newSelectedItem);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedInput = inputValue.trim();
    const isBackspace = evt.key === 'Backspace';
    const isEnter = evt.key === 'Enter';
    const isComma = evt.key === ',';

    if (isEnter || isComma) {
      evt.preventDefault();
      const newSelectedItems = [...tags];
      const duplicatedValues = newSelectedItems.indexOf(trimmedInput);

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }

      newSelectedItems.push(trimmedInput.replace(',', ''));
      selectedTags(newSelectedItems);
      setInputValue('');
    }

    if (isBackspace && inputValue.length === 0 && tags.length > 0) {
      selectedTags(tags.slice(0, tags.length - 1));
    }
  };

  return (
    <StyledChipInput
      className="WmeChipInput-root"
      InputProps={{
        fullWidth: true,
        autoComplete: 'false',
        startAdornment: tags.map((item) => (
          <Chip color="primary" size="small" key={item} tabIndex={-1} label={item} onDelete={deleteChip(item)} />
        )),
        value: inputValue,
        onKeyDown: handleKeyDown,
        onChange: (e) => setInputValue(e.target.value),
        ...rest,
      }}
    />
  );
};

export default ChipsInput;
