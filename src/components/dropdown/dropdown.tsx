import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import InputTitle from '../input-title';

/**
 * Dropdown should use the WME version of MenuItem to allow for custom styling and icons.
 */

interface WmeDropdownProps {
  children: Array<ReactNode>,
  value?: (string | number)[],
  onChange: any,
  selectValue?: string,
  helperText?: string,
  labelText?: string,
}

const StyledSelect = styled(Select, {
  name: 'WmeSelect',
  slot: 'Root',
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  '& .MuiSelect-select': {
    '& .Wme-selected-text': {
      color: theme.palette.text.primary,
    },
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.primary,
      borderWidth: 1,
    },
  },
}));

const StyledFormControl = styled(FormControl, {
  name: 'WmeFormControl',
  slot: 'Root',
})({
  width: 415,
});

const StyledFormHelperText = styled(FormHelperText, {
  name: 'WmeFormHelperText',
  slot: 'Root',
})({
  fontSize: 10,
  marginLeft: 0,
});

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
    helperText,
    labelText,
  } = props;

  const childrenWithIcons = children?.map((child: any) => {
    if (value?.includes(child.props.value)) {
      return React.cloneElement(child, { icon: <CheckIcon /> });
    }
    return child;
  });

  return (
    <StyledFormControl>
      {
        labelText
        && (
          <InputTitle>
            {labelText}
          </InputTitle>
        )
      }
      <StyledSelect
        multiple
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected: any) => {
          if (selected.length === 0) {
            return selectValue;
          }

          return <span className="Wme-selected-text">{selected.join(', ')}</span>;
        }}
        MenuProps={MenuProps}
      >
        {childrenWithIcons}
      </StyledSelect>
      {
        helperText
        && (
          <StyledFormHelperText>
            {helperText}
          </StyledFormHelperText>
        )
      }
    </StyledFormControl>
  );
};

export default Dropdown;
