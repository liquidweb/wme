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
import { createFilterOptions } from '@mui/material/Autocomplete';

export type AutocompleteOption =
  | string
  | {
      value: any;
      label: string;
      inputValue?: string;
    };

export type CustomAutoCompleteProps<T> = {
  autocompleteProps: AutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >;
};

export type AutocompleteInputProps = Omit<
  CustomAutoCompleteProps<AutocompleteOption>['autocompleteProps'],
  'renderInput' | 'onChange'
> & {
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
    height: 40,
    padding: '3px 12px',
    '& .MuiAutocomplete-input': {
      padding: 0,
    },
  },
}));

export const AutoCompletePaper: React.FC<PaperProps> = (props) => (
  <Paper
    {...props}
    sx={{
      boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    }}
  />
);

const filter = createFilterOptions<AutocompleteOption>();

export const CustomAutoComplete = <T extends unknown>(props: CustomAutoCompleteProps<T>) => {
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
      disableClearable: true,
      PaperComponent: AutoCompletePaper,
      //   @ts-ignore - this error is because we're on v5-alpha of MUI
      ListboxProps: MenuProps,
      onChange: (_event: any, newValue: any) => {
        if (newValue && newValue.value) {
          onChange(newValue.value);
        } else {
          onChange(newValue);
        }
      },
      getOptionLabel: (option: AutocompleteOption) => {
        if (typeof option === 'string') {
          return option;
        }

        return option.label;
      },
      filterOptions: (_options, params) => {
        const filtered = filter(_options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            value: inputValue,
            label: `Add "${inputValue}"`,
          });
        }

        return filtered;
      },
      options,
      value,

      renderInput: (params) => (
        <TextField
          placeholder={placeholder}
          {...params}
        />
      ),
      ...rest,
    },
  };

  return <CustomAutoComplete {...componentProps} />;
};

export default AutoCompleteInput;
