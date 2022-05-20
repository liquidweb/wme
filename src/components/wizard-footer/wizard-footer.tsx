import React, { ReactNode } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepButton,
  StepContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ChevronRight } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button } from '..';
import { useMaxActiveStep } from '../../hooks';

interface WizardFooterProps {
  backText?: string;
  onBack?: () => void;
  nextText?: string;
  onNext?: () => void;
  skipText?: string;
  onSkip?: () => void;
  activeStep: number;
  steps: Array<{
    id: number;
    hideBack?: boolean;
    hideSkip?: boolean;
    hideNext?: boolean;
    heading?: string;
    label?: string;
    step?: string;
    text?: string;
    hidePagination?: boolean;
    screen?: ReactNode;
  }>;
  onClickStep?: (step: any) => void;
  disableNext?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  save?: () => void;
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
  display: 'flex',
  alignItems: 'center',
  flex: 1,
}));

const Nav = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Nav',
})(() => ({
  flex: 1,
  maxWidth: '500px',
}));

const Skip = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Skip',
})(({ theme }) => ({
  marginRight: theme.spacing(1),
  cursor: 'pointer',
}));

const Next = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Next',
})(() => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const StyledStepper = styled(Stepper, {
  name: 'WmeStepper',
  slot: 'Root',
})(() => ({
  justifyContent: 'center',
}));

const StyledStepButton = styled(StepButton, {
  name: 'WmeStepButton',
  slot: 'Root',
})(() => ({
  '& .MuiStepLabel-root': {
    '& .MuiStepLabel-iconContainer': {
      '& .MuiSvgIcon-root': {
        width: '18px',
        height: '18px',
      },
    },
  },
}));

const WizardFooter: React.FC<WizardFooterProps> = (props) => {
  const {
    backText,
    onBack,
    nextText,
    onNext,
    skipText,
    onSkip,
    activeStep,
    steps,
    onClickStep,
    disableNext = false,
    isLoading = false,
    loadingText,
    save,
  } = props;

  const { maxActiveStep } = useMaxActiveStep(activeStep);
  const isLastStep = activeStep === steps.length - 1;

  return (
    <WizardFooterContainer>
      <Prev>
        {
          !steps[activeStep]?.hideBack
          && (
            <Button startIcon={<ArrowBack />} onClick={onBack}>{backText}</Button>
          )
        }
      </Prev>
      <Nav>
        <StyledStepper activeStep={maxActiveStep} connector={null}>
          {
            steps?.map((step) => {
              if (step.id > steps.length || step.hidePagination) {
                return null;
              }

              const isCurrentStep = step.id === activeStep;
              const unlocked = step.id <= maxActiveStep;

              return (
                <Step key={step.id} active={unlocked} completed={unlocked && !isCurrentStep}>
                  <StyledStepButton
                    onClick={() => onClickStep?.(step)}
                    sx={{ '&:hover': { textDecoration: unlocked ? 'underline' : 'none' } }}
                  >
                    { step.label }
                  </StyledStepButton>
                </Step>
              );
            })
}
        </StyledStepper>
      </Nav>
      <Next>
        <Skip>
          {
            !steps[activeStep]?.hideSkip
            && (
              <Button onClick={onSkip}>{skipText}</Button>
            )
          }
        </Skip>
        {
          !steps[activeStep]?.hideNext
          && (
            isLoading ? (
              <LoadingButton
                loading
                variant="contained"
                loadingPosition="start"
                startIcon={<ChevronRight />}
              >
                {loadingText}
              </LoadingButton>
            )
              : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isLastStep ? save : onNext}
                  disabled={disableNext}
                >
                  {nextText}
                </Button>
              )
          )
        }
      </Next>
    </WizardFooterContainer>
  );
};

export default WizardFooter;