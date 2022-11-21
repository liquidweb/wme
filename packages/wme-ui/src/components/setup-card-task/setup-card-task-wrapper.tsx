import type React from 'react';

import {
  Box,
  CardActionArea,
} from '@mui/material';
import type { SetupCardTaskProps } from './setup-card-task';

const CardContentWrapper = (props: Pick<SetupCardTaskProps, 'href' | 'onClick' | 'children' | 'button' | 'disabled'>) => {
  const {
    onClick, href, button, children, disabled,
  } = props;

  if (!button) {
    return (
      <CardActionArea
        {...(href ? { href } : {})}
        {...(onClick ? { onClick } : {})}
        disabled={disabled}
        className="WmeTask-content-wrapper"
      >
        {children}
      </CardActionArea>
    );
  }
  return <Box className="WmeTask-content-wrapper">{children}</Box>;
};

export default CardContentWrapper;
