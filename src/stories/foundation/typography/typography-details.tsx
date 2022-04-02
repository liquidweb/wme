import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { WMEVariants } from '../../../theme';

const VARIANT_INFO_LIST: [keyof CSSProperties, string][] = [
  ['fontFamily', 'Font Family'],
  ['fontWeight', 'Font Weight'],
  ['fontSize', 'Font Size'],
  ['lineHeight', 'Line Height'],
  ['letterSpacing', 'Letter Spacing'],
];

const TypographyDetails = ({ variant }: {variant: WMEVariants}) => {
  const theme = useTheme();
  const variantInfo = theme.typography[variant] as { [key: string]: string };
  console.log('theme.typography', theme.typography);
  console.log('variant', variant);
  console.log('variantInfo', variantInfo);
  if (!variantInfo) {
    return (
      <Typography variant={variant as any}>
        {`No info for: ${variant}: `}
      </Typography>
    );
  }
  return (
    <Box sx={{
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      mb: 2,

    }}
    >
      {
       VARIANT_INFO_LIST.map(([key, label]) => (
         <Box key={key}>
           <Typography sx={{ fontWeight: 'bold' }} variant="body">
             {`${label}: `}
           </Typography>
           <Typography variant="body">{`${variantInfo[key]}`}</Typography>
         </Box>
       ))
      }
    </Box>
  );
};

export default TypographyDetails;
