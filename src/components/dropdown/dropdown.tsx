import React from 'react';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import {
  FormControl,
  OutlinedInput,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

/**
 * Dropdown should use WmeMenuItem to allow for custom styling and icons.
 */

interface WmeDropdownProps {
  children: any,
  value?: (string | number)[],
  onChange?: any,
  selectValue?: string,
}

const WmeSelect = styled(Select, {
  name: 'WmeSelect',
  slot: 'Root',
})(({ theme }) => ({
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.border.dark,
      borderWidth: 1,
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 24;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 415,
      top: 96,
    },
  },
};

const Dropdown: React.FC<WmeDropdownProps> = (props) => {
  const {
    children,
    value,
    onChange,
    selectValue,
  } = props;

  const childrenWithIcons = children.map((child: any) => {
    if (value?.includes(child.props.value)) {
      return React.cloneElement(child, { icon: <CheckIcon /> });
    }
    return child;
  });

  return (
    <FormControl sx={{ m: 1, width: 415, mt: 3 }}>
      <WmeSelect
        multiple
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected: any) => {
          if (selected.length === 0) {
            return selectValue;
          }

          return selected.join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {childrenWithIcons}
      </WmeSelect>
    </FormControl>
  );
};

export default Dropdown;
