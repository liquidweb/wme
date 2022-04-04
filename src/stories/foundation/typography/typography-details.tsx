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

function remStringToPx(remString: string): number {
  return parseFloat(remString.replace('rem', '')) * 16;
}

const TypographyDetails = ({ variant }: {variant: WMEVariants}) => {
  const theme = useTheme();
  const variantInfo = theme.typography[variant] as { [key: string]: string };
  if (!variantInfo) {
    return (
      <Typography variant={variant as any}>
        {`No info for: ${variant}: `}
      </Typography>
    );
  }
  const fontSizePx = variantInfo.fontSize.includes('rem') && remStringToPx(variantInfo.fontSize);
  const lineHeightPx = fontSizePx && typeof variantInfo.lineHeight === 'number' && variantInfo.lineHeight * fontSizePx;

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
           <Typography sx={{ fontWeight: '600' }} variant="body">
             {`${label}: `}
           </Typography>
           <Typography variant="body">
             {`${variantInfo[key]}`}
             {key === 'fontSize' && fontSizePx && ` (${fontSizePx}px)`}
             {key === 'lineHeight' && lineHeightPx && ` (${lineHeightPx}px)`}
           </Typography>
         </Box>
       ))
      }
    </Box>
  );
};

export default TypographyDetails;
