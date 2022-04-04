import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, LinkProps } from '@mui/material';

interface SetupCardListItemProps {
  icon?: React.ReactNode;
  title: string;
  href?: string;
  target?: string;
  linkProps?: LinkProps;
}

const StyledSetupCardIconWrapper = styled('div', {
  name: 'WmeSetupCardListItem',
  slot: 'WmeIconWrapper',
  shouldForwardProp: (prop) => prop !== 'linkProps',
})(({ theme }) => ({
  display: 'flex',
  minWidth: theme.spacing(3.5),
  '& svg': {
    fontSize: '1.5em',
  },
}));

const StyledSetupCardTextWrapper = styled('div', {
  name: 'WmeSetupCardListItem',
  slot: 'WmeTextWrapper',
})(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

const StyledSetupCardListItem = styled('li', {
  name: 'WmeSetupCardListItem',
  slot: 'Root',
})<SetupCardListItemProps>(({ theme }) => ({
  '& .MuiLink-root': {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,

    '&[href]:not([href=""]):hover': {
      color: theme.palette.text.link,
    },
  },
}));

export default function SetupCardListItem(props: SetupCardListItemProps) {
  const {
    icon = null,
    title,
    href,
    target = '_self',
    linkProps = {},
  } = props;

  return (
    <StyledSetupCardListItem {...props}>
      <Link
        href={href}
        target={target}
        variant="body2"
        underline="none"
        {...linkProps}
      >
        { icon && <StyledSetupCardIconWrapper>{icon}</StyledSetupCardIconWrapper> }
        <StyledSetupCardTextWrapper>{title}</StyledSetupCardTextWrapper>
      </Link>
    </StyledSetupCardListItem>
  );
}
