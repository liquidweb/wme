import React, { ReactElement } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, FormControlProps, OutlinedInput } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { InputTitle, FormHelperText, ErrorText } from '..';

/**
 * Dropdown should use the WME version of MenuItem to allow for custom styling and icons.
 */

interface WmeDropdownProps {
  children: Array<ReactElement>;
  value?: (string | number)[];
  onChange: (event: SelectChangeEvent<unknown>) => void;
  selectValue?: string;
  helperText?: string;
  labelText?: string;
  error?: boolean;
  errorMessage?: string;
  multiple?: boolean;
  width?: string | number;
}

interface WmeFormControlProps extends FormControlProps {
  helperText?: string;
  labelText?: string;
  width?: string | number;
}

const StyledSelect = styled(Select, {
  name: 'WmeSelect',
  slot: 'Root',
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  height: theme.globalStyles.menuListItemHeight,
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
  '&.Mui-error': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
  },
}));

const StyledFormControl = styled(FormControl, {
  name: 'WmeFormControl',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'width',
})<WmeFormControlProps>(({ theme, width }) => ({
  width: width || theme.globalStyles.menuPaperWidth,
}));

const Dropdown: React.FC<WmeDropdownProps> = (props) => {
  const theme = useTheme();

  const {
    children,
    selectValue,
    helperText,
    labelText,
    error,
    errorMessage,
    value,
    width,
    ...rest
  } = props;

  const itemHeight = theme.globalStyles.menuListItemHeight;
  const itemPaddingTop = theme.globalStyles.menuListItemPadding;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: itemHeight * 4.5 + itemPaddingTop,
        top: 96,
        width: width || theme.globalStyles.menuPaperWidth,
      },
    },
  };

  const childrenWithIcons = children?.map((child) => {
    if (child && value?.includes(child.props.value)) {
      return React.cloneElement(child, { icon: <CheckIcon /> });
    }
    return child;
  });

  return (
    <StyledFormControl width={width}>
      {
        labelText
        && (
          <InputTitle>
            {labelText}
          </InputTitle>
        )
      }
      <StyledSelect
        displayEmpty
        error={error}
        value={value}
        input={<OutlinedInput />}
        renderValue={(selected: any) => {
          if (selected.length === 0 || typeof selected === 'string') {
            return selectValue;
          }

          return <span className="Wme-selected-text">{selected.join(', ')}</span>;
        }}
        MenuProps={MenuProps}
        {...rest}
      >
        {childrenWithIcons}
      </StyledSelect>
      {
        (error && errorMessage)
        && (
          <ErrorText>{errorMessage}</ErrorText>
        )
      }
      {
        helperText
        && (
          <FormHelperText>
            {helperText}
          </FormHelperText>
        )
      }
    </StyledFormControl>
  );
};

export default Dropdown;
