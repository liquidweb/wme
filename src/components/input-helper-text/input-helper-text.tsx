import React, { PropsWithChildren } from "react";
import { FormHelperText, FormHelperTextProps, styled } from "@mui/material";

interface InputHelperTextProps extends FormHelperTextProps {
  onClick?: () => void;
}

const StyledInputHelperText = styled(FormHelperText, {
  name: "WmeInputHelperText",
  slot: "Root",
})({
  fontSize: 10,
  marginLeft: 0,
});

const InputHelperText: React.FC<PropsWithChildren<InputHelperTextProps>> = ({
  children,
  ...props
}) => {
  return (
    <StyledInputHelperText
      className={StyledInputHelperText.displayName}
      {...props}
    >
      {children}
    </StyledInputHelperText>
  );
};

export default InputHelperText;
