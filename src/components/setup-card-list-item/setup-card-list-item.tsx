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
  shouldForwardProp: (prop) => prop !== 'linkProps' && prop !== 'icon' && prop !== 'title' && prop !== 'href',
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
    icon = false,
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
        variant="body1"
        underline="none"
        className={StyledSetupCardListItem.displayName}
        {...linkProps}
      >
        { icon && (
          <StyledSetupCardIconWrapper
            className={StyledSetupCardIconWrapper.displayName}
          >
            {icon}
          </StyledSetupCardIconWrapper>
        )}
        <StyledSetupCardTextWrapper
          className={StyledSetupCardTextWrapper.displayName}
        >
          {title}
        </StyledSetupCardTextWrapper>
      </Link>
    </StyledSetupCardListItem>
  );
}
