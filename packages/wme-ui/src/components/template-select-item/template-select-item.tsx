import type React from 'react';
import {
  styled,
  Box,
  BoxProps,
  IconProps,
  Typography,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TemplateSelectItemProps extends BoxProps {
  imageSrc: string;
  imageAlt: string;
  buttonLabel: string;
  buttonSelectedLabel: string;
  selected: boolean;
}

const TemplateItemContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '90%',
  overflow: 'hidden',
  borderRadius: 2,
  border: '1px solid transparent',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover, &:focus': {
    borderColor: theme.palette.text.primary,
    '& > .MuiBox-root': {
      transform: 'translateY(0)',
    },
  },
  '&.is-selected': {
    borderColor: theme.palette.success.main,
    '& > .MuiBox-root': {
      transform: 'translateY(0)',
    },
  },
}));

const TemplateItemImage = styled('img')(() => ({
  width: '100%',
}));

const TemplateItemButton = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 2,
  textAlign: 'center',
  fontSize: theme.typography.pxToRem(13),
  padding: '10px 0',
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  transform: 'translateY(100%)',
  '.is-selected &': {
    backgroundColor: theme.palette.success.main,
  },
}));

const TemplateItemCheck = styled(CheckCircleIcon)<IconProps>(({ theme }) => ({
  position: 'absolute',
  right: 20,
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: theme.typography.htmlFontSize,
}));

export default function TemplateSelectItem(props: TemplateSelectItemProps) {
  const {
    imageSrc,
    imageAlt,
    buttonLabel,
    buttonSelectedLabel,
    selected,
    ...rest
  } = props;

  return (
    <TemplateItemContainer
      className={selected ? 'is-selected' : ''}
      {...rest}
    >
      <TemplateItemImage
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
      />
      <TemplateItemButton>
        <Typography color="common.white">
          {selected ? buttonSelectedLabel : buttonLabel}
          {selected && (
            <TemplateItemCheck />
          )}
        </Typography>
      </TemplateItemButton>
    </TemplateItemContainer>
  );
}
