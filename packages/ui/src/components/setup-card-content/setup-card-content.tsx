import * as React from 'react';
import { CardContent, CardContentProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const SetupCardContentWrapper = styled(CardContent, {
  name: 'WmeSetupCardContent',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    styles.root,
  ],
})({});

const SetupCardContent: React.FC<CardContentProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <SetupCardContentWrapper className="WmeSetupCardContent-root" {...rest}>
      { children }
    </SetupCardContentWrapper>
  );
};

export default SetupCardContent;
