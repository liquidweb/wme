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

const DESCRIPTIONS = {
  h1: 'Use as a main header on a page',
  h2: 'Use as a secondary header on a page',
  h3: 'Use as after headings and on set up cards',
  h4: 'Use as after headings and on set up cards',
  h5: 'Use as Labels for Inputs, Footers',
  body: 'Body copy',
  subtext: 'Use for helper text, captions, and tool tips',
  link: 'Use for links, Call To Actions',
// eslint-disable-next-line no-unused-vars
} as { [_ in WMEVariants]: string };

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
           <Typography sx={{ lineHeight: '24px', fontWeight: '600' }} variant="body">
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
      {DESCRIPTIONS[variant] && (
      <Box>
        <Typography sx={{ color: '#757575' }} variant="subtext">
          {DESCRIPTIONS[variant]}
        </Typography>
      </Box>
      )}
    </Box>
  );
};

export default TypographyDetails;
