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
})(() => ({
  display: 'flex',
  alignItems: 'center',
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
