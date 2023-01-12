import type React from 'react';
import {
  Box, BoxProps, Link, LinkProps, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface JumpNavProps extends BoxProps {
  title?: string;
  links: Array<{
    id: string;
    label: string;
    onClick: () => void;
    remainingTasks?: number;
  }>;
}

const JumpNavContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

const JumpNavLink = styled(Link)<LinkProps>(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  cursor: 'pointer',
  '&:hover, &:active': {
    color: theme.palette.primary.main,
  },
}));

const LinkLabel = styled('span')(() => ({
  textDecoration: 'underline',
  textUnderlineOffset: 2,
  fontSize: '.875rem',
}));

const TaskNumber = styled(Box)<BoxProps>(({ theme }) => ({
  height: 16,
  width: 16,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.typography.pxToRem(8),
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: '50%',
}));

export default function JumpNav(props: JumpNavProps) {
  const { title, links, ...rest } = props;

  return (
    <JumpNavContainer {...rest}>
      {title && <Typography sx={{ fontWeight: 500, fontSize: '.875rem' }}>{title}</Typography>}
      {links?.map((link) => (
        <JumpNavLink onClick={link.onClick} underline="none" key={link.id}>
          <LinkLabel>{link.label}</LinkLabel>
          {(link?.remainingTasks && link.remainingTasks > 0) && (
          <TaskNumber>{link.remainingTasks}</TaskNumber>
          )}
        </JumpNavLink>
      ))}
    </JumpNavContainer>
  );
}
