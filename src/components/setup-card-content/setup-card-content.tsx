import * as React from 'react';
import { CardContent, CardContentProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const SetupCardContentWrapper = styled(CardContent, {
  name: 'WmeSetupCardContent',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    styles.root,
  ],
})();

const SetupCardContent: React.FC<CardContentProps> = (props) => {
  const { children, ...rest } = props;
  const { displayName } = SetupCardContentWrapper;

  return (
    <SetupCardContentWrapper className={displayName} {...rest}>
      { children }
    </SetupCardContentWrapper>
  );
};

export default SetupCardContent;
