import React, { PropsWithChildren } from "react";
import Box, { BoxProps } from "@mui/material/Box";

const Form: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => {
  return (
    <Box autoComplete="off" component="form" noValidate {...props}>
      {children}
    </Box>
  );
};

export default Form;
