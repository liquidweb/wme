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
  padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
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

const NexcessLogo = (
  <svg
    width={120}
    height={24}
    viewBox="0 0 120 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.782 23.776H15.42L3.362 5.096v18.68H0V0h3.362L15.42 18.785V0h3.362v23.776zM36.779 16.642H23.67c.44 3.157 2.548 4.551 4.96 4.517 2.039-.035 4.007-1.02 4.926-3.263l2.922 1.154c-1.359 3.293-4.48 4.891-7.842 4.926-4.451.035-8.252-2.817-8.252-8.693 0-5.875 3.801-8.728 8.252-8.693 4.45.035 8.252 2.818 8.252 8.693 0 .475-.035.92-.1 1.359h-.01zM23.67 13.824h9.916c-.51-3.092-2.583-4.381-4.96-4.416-2.378-.035-4.45 1.324-4.96 4.416h.005zM45.85 15.253l.07-.14 5.91-8.318h-3.877l-3.87 5.805-3.872-5.805H36.34l5.91 8.318.069.14 1.763 2.613 3.976 5.91h3.837l-6.045-8.523z"
      fill="#fff"
    />
    <path
      d="M36.274 23.776h3.837l3.97-5.91h-3.616l-4.19 5.91zM51.115 15.283c0-5.875 3.801-8.728 8.252-8.693 3.432.035 6.319 1.699 7.643 5.16l-2.952 1.09c-.85-2.378-2.618-3.397-4.686-3.432-2.717-.035-5.06 1.733-5.06 5.875 0 4.142 2.343 5.91 5.06 5.876 2.073-.035 3.836-1.055 4.686-3.433l2.952 1.09c-1.324 3.462-4.211 5.13-7.643 5.16-4.45.035-8.252-2.817-8.252-8.693zM84.398 16.642H71.29c.44 3.157 2.547 4.551 4.96 4.517 2.038-.035 4.006-1.02 4.925-3.263l2.922 1.154c-1.358 3.293-4.48 4.891-7.842 4.926-4.45.035-8.252-2.817-8.252-8.693 0-5.875 3.801-8.728 8.252-8.693 4.45.035 8.252 2.818 8.252 8.693 0 .475-.035.92-.1 1.359h-.01zM71.29 13.824h9.915c-.51-3.092-2.582-4.381-4.96-4.416-2.378-.035-4.45 1.324-4.96 4.416h.005zM85.621 19.19l3.227-.68c.305 1.87 2.003 2.753 3.906 2.753s3.871-.884 3.871-2.922c0-3.802-10.7.51-10.7-6.625 0-4.891 5.026-5.161 6.83-5.161 1.697 0 6.043.24 6.793 4.007l-3.058.884c-.41-1.769-1.833-2.378-3.736-2.378-1.903 0-3.497.68-3.497 2.648 0 3.942 10.7-.61 10.7 6.625 0 5.196-5.33 5.64-7.198 5.64-1.698 0-6.588-.41-7.133-4.791h-.005zM101.246 19.19l3.227-.68c.305 1.87 2.003 2.753 3.906 2.753s3.871-.884 3.871-2.922c0-3.802-10.699.51-10.699-6.625 0-4.891 5.025-5.161 6.828-5.161 1.698 0 6.044.24 6.793 4.007l-3.057.884c-.409-1.769-1.833-2.378-3.736-2.378-1.903 0-3.496.68-3.496 2.648 0 3.942 10.699-.61 10.699 6.625 0 5.196-5.33 5.64-7.198 5.64-1.698 0-6.588-.41-7.133-4.791h-.005z"
      fill="#fff"
    />
  </svg>
);

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
    logo = NexcessLogo, icon, heading, body, children, subtext, subtextIcon = QuestionIcon,
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
