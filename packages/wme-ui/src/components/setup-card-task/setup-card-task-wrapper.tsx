import type React from 'react';

import {
  Box,
  CardActionArea,
} from '@mui/material';
import type { SetupCardTaskProps } from './setup-card-task';

const CardContentWrapper = (props: Pick<SetupCardTaskProps, 'href' | 'target' | 'onClick' | 'children' | 'button' | 'disabled'>) => {
  const {
    onClick, href, target, button, children, disabled,
  } = props;

  if (!button) {
    return (
      <CardActionArea
        {...(href ? { href } : {})}
        {...(target ? { target } : {})}
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
