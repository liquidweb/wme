import type React from 'react';
import { CardContent, CardContentProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const SetupCardContentWrapper = styled(CardContent, {
  name: 'WmeSetupCardContent',
  slot: 'Root',
  // @ts-ignore: No Unused Parameters - props is passed but not used.
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
