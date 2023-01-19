import React from 'react';
import {
  styled,
  Autocomplete,
  AutocompleteProps,
  TextField,
  useTheme,
  Paper,
  PaperProps,
} from '@mui/material';

export type AutocompleteOption = string | {
  value: any;
  label: string;
}

export type CustomAutoCompleteProps<T> = {
  autocompleteProps: AutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >;
}

export type AutocompleteInputProps = Omit<CustomAutoCompleteProps<AutocompleteOption>['autocompleteProps'], 'renderInput'> & {
    onChange: (arg: any) => void;
    placeholder?: string;
};

const StyledAutocomplete = styled(Autocomplete, {
  name: 'WmeAutocomplete',
  slot: 'Root',
})(({ theme }) => ({
  '& input::placeholder': {
    color: theme.palette.text.disabled,
    opacity: 1,
  },
  '& .MuiAutocomplete': {
    '& .Wme-selected-text': {
      color: theme.palette.text.primary,
    },
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.primary,
      borderWidth: 1,
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    paddingTop: 3,
    paddingBottom: 3,
  },
}));

const AutoCompletePaper: React.FC<PaperProps> = (props) => (
  <Paper
    {...props}
    sx={{
      boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    }}
  />
);

export const CustomAutoComplete = <T extends unknown>(
  props: CustomAutoCompleteProps<T>,
) => {
  const { autocompleteProps } = props;

  // @ts-ignore - this weird error has no impact on functionality
  return <StyledAutocomplete {...autocompleteProps} />;
};

const AutoCompleteInput: React.FC<AutocompleteInputProps> = (props) => {
  const {
    onChange, options, value, placeholder, ...rest
  } = props;
  const theme = useTheme();

  const MenuProps = {
    sx: {
      '& li': {
        height: theme.globalStyles.menuListItemHeight,
        '&.MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
          backgroundColor: theme.palette.background.grey,
        },
        '&.MuiAutocomplete-option[aria-selected="true"]': {
          backgroundColor: theme.palette.background.grey,
        },
      },
    },
  };

  const componentProps: CustomAutoCompleteProps<AutocompleteOption> = {
    autocompleteProps: {
      PaperComponent: AutoCompletePaper,
      //   @ts-ignore - this error is because we're on v5-alpha of MUI
      ListboxProps: MenuProps,
      onChange: (_event: any, newValue: AutocompleteOption | AutocompleteOption[] | null) => {
        onChange(newValue as AutocompleteOption);
      },
      options,
      disablePortal: true,
      renderInput: (params) => <TextField {...params} placeholder={placeholder} />,
      ...rest,
    },
  };

  return (
    <CustomAutoComplete
      {...componentProps}
    />

  );
};

export default AutoCompleteInput;
