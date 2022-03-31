import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TextFieldProps {
    variant?: 'outlined',
}

const StyledTextField = styled(MuiTextField)<MuiTextFieldProps>(() => ({

}));

const TextField: React.FC<TextFieldProps> = (props) => <StyledTextField {...props} />;

export default TextField;
