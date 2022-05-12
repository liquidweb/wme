import React, { ReactElement } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WizardFooterProps {
  previous?: ReactElement;
  next: ReactElement;
  skip?: ReactElement;
  children: ReactElement;
}

const WizardFooterContainer = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
  position: 'absolute',
  justifyContent: 'center',
  left: theme.spacing(4),
  right: theme.spacing(4),
  bottom: theme.spacing(4),
}));

const Prev = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Prev',
})(() => ({
  flex: 1,
}));

const Nav = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Nav',
})(() => ({
  flex: 2,
}));

const Skip = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Skip',
})(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Next = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Next',
})(() => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginLeft: 'auto',
}));

const WizardFooter: React.FC<WizardFooterProps> = (props) => {
  const {
    previous,
    next,
    skip,
    children,
  } = props;

  return (
    <WizardFooterContainer>
      <Prev>
        {previous}
      </Prev>
      <Nav>
        {children}
      </Nav>
      <Next>
        <Skip>{skip}</Skip>
        {next}
      </Next>
    </WizardFooterContainer>
  );
};

export default WizardFooter;
