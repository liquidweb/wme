/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { CardMedia, CardMediaProps, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface VideoEmbedProps extends CardMediaProps {
  allow?: string;
  height?: string;
  width?: string;
  component?: string;
}

const StyledContainer = styled(Box, {
  name: 'WmeVideoEmbed',
  slot: 'Root',
})(() => ({
  overflow: 'hidden',
  paddingBottom: '56.25%',
  position: 'relative',
  height: 0,
}));

const StyledMedia = styled(CardMedia, {
  name: 'WmeVideoEmbed',
  slot: 'Media',
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'height',
})<VideoEmbedProps>(({ width, height }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: height || '100%',
  width: width || '100%',
}));

const VideoEmbed: React.FC<VideoEmbedProps> = (props) => {
  const videoProps = {
    frameBorder: 0,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    component: 'iframe',
    ...props,
  };

  return (
    <StyledContainer className="WmeVideoEmbed-root">
      <StyledMedia className="WmeVideoEmbed-media" {...videoProps} />
    </StyledContainer>
  );
};

export default VideoEmbed;
