import React from 'react';
import { useFormControlUnstyledContext } from '@mui/base';
import {
  OutlinedInput,
  Select,
  SelectProps,
  styled,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface SelectInputProps extends SelectProps {
  placeholder?: string;
  width?: string | number;
}

const StyledSelectInput = styled(Select, {
  name: 'WmeSelectInput',
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

const SelectInput: React.FC<SelectInputProps> = ({
  children,
  placeholder,
  value,
  width,
  ...props
}) => {
  const formControlContext = useFormControlUnstyledContext();
  const theme = useTheme();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight:
          theme.globalStyles.menuListItemHeight * 4.5
          + theme.globalStyles.menuListItemPadding,
        top: 96,
        width: width || theme.globalStyles.menuPaperWidth,
      },
    },
  };

  const childrenWithIcons = Array.isArray(children) && Array.isArray(value)
    ? (children as React.ReactElement[])?.map((child) => {
      if (child && value.includes(child.props.value)) {
        return React.cloneElement(child, { icon: <CheckIcon /> });
      }
      return child;
    }) : children;

  return (
    <StyledSelectInput
      className={StyledSelectInput.displayName}
      displayEmpty
      error={formControlContext?.error}
      input={<OutlinedInput />}
      MenuProps={MenuProps}
      renderValue={(selected: any) => {
        if (!selected || selected.length === 0) {
          return placeholder;
        }

        return (
          <span className="Wme-selected-text">
            {typeof selected === 'string' ? selected : selected.join(', ')}
          </span>
        );
      }}
      value={value}
      {...props}
    >
      {childrenWithIcons}
    </StyledSelectInput>
  );
};

export default SelectInput;
