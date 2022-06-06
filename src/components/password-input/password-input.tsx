import React, { useState } from "react";
import { useFormControlUnstyledContext } from "@mui/base";
import { ChipProps, InputBaseProps, styled } from "@mui/material";
import Chip from "./chip";
import EndAdornment from "./end-adornment";
import { TextInput } from "..";

/**
 * Password field is a WME Text Field component with additional props
 */

interface PasswordInputProps extends InputBaseProps {
  chipColor?: ChipProps["color"];
  chipLabel?: ChipProps["label"];
  value: any;
}

const StyledPasswordInput = styled(TextInput, {
  name: "WmePasswordInput",
  slot: "Root",
})({});

const PasswordInput: React.FC<PasswordInputProps> = ({
  chipColor,
  chipLabel,
  onClick,
  type,
  value,
  ...props
}) => {
  const formControlContext = useFormControlUnstyledContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <StyledPasswordInput
      className={StyledPasswordInput.displayName}
      endAdornment={
        <EndAdornment
          chip={
            chipLabel ? <Chip color={chipColor} label={chipLabel} /> : undefined
          }
          onClickAdornment={() => {
            setShowPassword(!showPassword);
          }}
          position="end"
          visible={showPassword}
        />
      }
      error={formControlContext?.error}
      type={showPassword ? "text" : "password"}
      value={value}
      {...props}
    />
  );
};

export default PasswordInput;
