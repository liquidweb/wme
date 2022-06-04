import React, { ReactElement } from "react";
import {
  OutlinedInput,
  Select,
  SelectProps,
  styled,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface SelectInputProps extends SelectProps {
  children: Array<ReactElement>;
  placeholder?: string;
  width?: string | number;
  value?: (string | number)[];
}

const StyledSelectInput = styled(Select, {
  name: "WmeSelectInput",
  slot: "Root",
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  height: theme.globalStyles.menuListItemHeight,
  "& .MuiSelect-select": {
    "& .Wme-selected-text": {
      color: theme.palette.text.primary,
    },
  },
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.primary,
      borderWidth: 1,
    },
  },
  "&.Mui-error": {
    "& .MuiOutlinedInput-notchedOutline": {
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

  const childrenWithIcons = children?.map((child) => {
    if (child && value?.includes(child.props.value)) {
      return React.cloneElement(child, { icon: <CheckIcon /> });
    }
    return child;
  });

  return (
    <StyledSelectInput
      className={StyledSelectInput.displayName}
      displayEmpty
      input={<OutlinedInput />}
      MenuProps={MenuProps}
      renderValue={(selected: any) => {
        if (!selected || selected.length === 0) {
          return placeholder;
        }

        return <span className="Wme-selected-text">{typeof selected === 'string' ? selected : selected.join(", ")}</span>;
      }}
      {...props}
    >
      {childrenWithIcons}
    </StyledSelectInput>
  );
};

export default SelectInput;
