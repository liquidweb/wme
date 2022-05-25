import React, { ReactNode } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepButton,
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
    disableNext?: boolean;
    disableAll?: boolean;
  }>;
  onClickStep?: (step: any) => void;
  disableNext?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  save?: () => void;
  hideFooter: boolean;
  disableAll?: boolean;
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
  left: theme.spacing(2),
  right: theme.spacing(2),
  bottom: 0,
  padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.background.primary,
  borderTop: `1px solid ${theme.palette.border.layout}`,
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
    hideFooter,
    disableAll,
  } = props;

  const { maxActiveStep } = useMaxActiveStep(activeStep);
  const isLastStep = activeStep === steps.length - 1;
  const currStep = steps[activeStep];
  const disable = disableAll || currStep?.disableAll;

  if (!hideFooter) {
    return (
      <WizardFooterContainer>
        <Prev>
          {
            !currStep?.hideBack
            && (
              <Button
                startIcon={<ArrowBack />}
                onClick={onBack}
                disabled={disable}
              >
                {backText}
              </Button>
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
                      disabled={disable}
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
              !currStep?.hideSkip
              && (
                <Button onClick={onSkip} disabled={disable}>{skipText}</Button>
              )
            }
          </Skip>
          {
            !currStep?.hideNext
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
                    disabled={(disableNext || currStep?.disableNext || disable)}
                  >
                    {nextText}
                  </Button>
                )
            )
          }
        </Next>
      </WizardFooterContainer>
    );
  }
  return null;
};

export default WizardFooter;
