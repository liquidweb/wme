import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    
}

const BUTTON_SX = {}

export default function Button(props: ButtonProps) {
    return <MuiButton sx={ {...BUTTON_SX, ...props.sx}} {...props} />;
};