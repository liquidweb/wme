import React, { useEffect, useRef, useState } from 'react';
import {
  styled, Box, BoxProps, IconProps, Typography,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const embedWidth = 1280;

interface TemplateSelectItemProps extends BoxProps {
  imageSrc?: string;
  imageAlt?: string;
  buttonLabel?: string;
  buttonSelectedLabel?: string;
  selected: boolean;
  websiteSrc?: string;
}

const TemplateItemContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '135%',
  overflow: 'hidden',
  borderRadius: 2,
  border: '1px solid transparent',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover, &:focus': {
    borderColor: theme.palette.text.primary,
    '& > .MuiBox-root': {
      transform: 'translateY(0)',
      opacity: 1,
    },
    '.is-hovered &': {
      opacity: 1,
    },
  },
  '&.is-selected': {
    borderColor: theme.palette.success.main,
    '& > .MuiBox-root': {
      transform: 'translateY(0)',
      opacity: 1,
    },
    '.is-hovered &': {
      opacity: 1,
    },
  },
  '.is-hovered &': {
    opacity: 0.5,
  },
}));

const TemplateItemImage = styled('img')(() => ({
  width: '100%',
}));

const TemplateItemEmbed = styled('iframe')(() => ({
  position: 'absolute',
  width: embedWidth,
  height: 2000,
  transform: 'scale(0.2)',
  transformOrigin: '0 0',
  border: 0,
  overflow: 'hidden',
}));

const TemplateItemButton = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 2,
  textAlign: 'center',
  fontSize: theme.typography.pxToRem(13),
  padding: '12px 0',
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease-in-out',
  opacity: 0,
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
    buttonLabel = 'Start With This Style',
    buttonSelectedLabel = 'Selected',
    selected,
    websiteSrc,
    ...rest
  } = props;
  const [embedScale, setEmbedScale] = useState(0.2);
  const containerRef = useRef();

  useEffect(() => {
    console.log('container change', containerRef?.current);
    if (containerRef && containerRef.current) {
      // @ts-ignore
      setEmbedScale(containerRef.current.clientWidth / embedWidth);
    }
  }, [containerRef]);

  return (
    <TemplateItemContainer className={selected ? 'is-selected' : ''} {...rest} ref={containerRef}>
      {imageSrc && <TemplateItemImage src={imageSrc} alt={imageAlt} loading="lazy" />}
      {websiteSrc && !imageSrc && (
        <TemplateItemEmbed
          src={websiteSrc}
          title={websiteSrc}
          style={{ transform: `scale(${embedScale})` }}
          seamless
          scrolling="no"
        />
      )}
      <TemplateItemButton>
        <Typography color="common.white">
          {selected ? buttonSelectedLabel : buttonLabel}
          {selected && <TemplateItemCheck />}
        </Typography>
      </TemplateItemButton>
    </TemplateItemContainer>
  );
}
