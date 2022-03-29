import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const Spacing = ({ size = 1 }: {size: number}) => {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      mb: 2,

    }}
    >
      <Box sx={{ minWidth: 90 }}>
        {`(${size}) / ${theme.spacing(size)}`}
      </Box>

      <Box
        sx={{
          height: theme.spacing(size),
          backgroundColor: '#BFD1FF',
          flex: 1,
          ml: 5,
        }}
      />
    </Box>
  );
};

export default Spacing;
