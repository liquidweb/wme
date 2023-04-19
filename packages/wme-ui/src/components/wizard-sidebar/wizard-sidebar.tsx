import type React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  WizardSectionTitle,
} from '..';

const WizardSidebarContainer = styled(Box, {
  name: 'WmeWizardSidebar',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  backgroundColor: theme.palette.background.dark,
  color: theme.palette.text.white,
  height: '100%',
  '& .WmeWizardSectionTitle-heading': {
    color: theme.palette.text.white,
  },
  '& .WmeWizardSectionTitle-copy': {
    color: theme.palette.text.white,
  },
}));

const StyledBox = styled(Box, {
  name: 'WmeWizardSidebarBox',
  slot: 'Root',
})(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const SubtextBox = styled(Box, {
  name: 'WmeWizardSidebarSubtextBox',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
}));

export type WizardSidebarProps = {
  logo?: React.ReactNode;
  icon?: React.ReactNode;
  heading: string;
  body: string;
  children?: React.ReactNode;
  subtext?: React.ReactNode;
  subtextIcon?: React.ReactNode;
}

const QuestionIcon = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.333 11h1.334V9.667H6.333V11zM7 .333A6.67 6.67 0 00.333 7 6.67 6.67 0 007 13.667 6.67 6.67 0 0013.667 7 6.67 6.67 0 007 .333zm0 12A5.34 5.34 0 011.667 7 5.34 5.34 0 017 1.667 5.34 5.34 0 0112.333 7 5.34 5.34 0 017 12.333zM7 3a2.666 2.666 0 00-2.667 2.667h1.334c0-.734.6-1.334 1.333-1.334s1.333.6 1.333 1.334c0 1.333-2 1.166-2 3.333h1.334c0-1.5 2-1.667 2-3.333A2.666 2.666 0 007 3z"
      fill="#fff"
    />
  </svg>
);

export default function WizardSidebar(props: WizardSidebarProps) {
  const {
    logo, icon, heading, body, children, subtext, subtextIcon = QuestionIcon,
  } = props;
  return (
    <WizardSidebarContainer>
      <StyledBox sx={{ justifyContent: 'flex-start', marginTop: 'auto' }}>
        {logo || null}
      </StyledBox>
      <StyledBox sx={{
        justifyContent: 'center', paddingTop: 4, paddingBottom: 4, gap: 3,
      }}
      >
        {icon || null}
        <WizardSectionTitle
          heading={heading}
          copy={body}
          headingVariant="h3"
          sx={{
            color: 'white',
          }}
        />
        {children || null}
      </StyledBox>
      <StyledBox sx={{
        justifyContent: 'flex-end', marginBottom: 'auto',
      }}
      >
        <SubtextBox>
          {subtext && (subtextIcon || null)}
          <Typography sx={{ color: 'white', flex: 1 }} variant="subtext">
            {subtext}
          </Typography>
        </SubtextBox>
      </StyledBox>
    </WizardSidebarContainer>
  );
}
