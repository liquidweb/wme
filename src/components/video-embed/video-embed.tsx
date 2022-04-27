import React from 'react';
import { CardMedia, CardMediaProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface VideoEmbedProps extends CardMediaProps {
  frameBorder?: number | string;
  allow?: string;
  height?: number | string;
  width?: number | string;
  component?: string;
}

const StyledMedia = styled(CardMedia, {
  name: 'WmeVideoEmbed',
  slot: 'Root',
})<VideoEmbedProps>(({ width, height }) => ({
  overflow: 'hidden',
  paddingBottom: '56.25%',
  position: 'relative',
  width,
  height,

  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const VideoEmbed: React.FC<VideoEmbedProps> = (props) => {
  const videoProps = {
    frameBorder: 0,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    height: 315,
    width: 560,
    component: 'iframe',
    ...props,
  };

  return (
    <StyledMedia {...videoProps} />
  );
};

export default VideoEmbed;
