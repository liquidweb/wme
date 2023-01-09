import type React from 'react';
import type { ReactNode } from 'react';
import {
  Box,
  BoxProps,
  Stepper,
  Step,
  StepButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '..';
import { useMaxActiveStep } from '../../../hooks';

export interface WizardFooterProps extends BoxProps {
  backText?: string;
  onBack?: () => void;
  nextText?: string;
  nextStartIcon?: ReactNode;
  nextEndIcon?: ReactNode;
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
    disable?: boolean;
    completed?: boolean;
  }>;
  onClickStep?: (step: any) => void;
  disableNext?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  save?: () => void;
  hideSkip?: boolean;
  hideFooter: boolean;
  disableAll?: boolean;
  isLastStep?: boolean;
}

const WizardFooterContainer = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
  justifyContent: 'center',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.background.primary,
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
})(({ theme }) => ({
  '& .MuiStepLabel-root': {
    '& .MuiStepLabel-iconContainer': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.secondary.main,
        width: '18px',
        height: '18px',
      },
    },
    '& .MuiStepLabel-labelContainer': {
      '& .MuiStepLabel-label': {
        fontWeight: 500,
      },
    },
    '&.Mui-disabled': {
      '& .MuiStepLabel-iconContainer': {
        '& .MuiSvgIcon-root': {
          color: theme.palette.text.disabled,
        },
      },
      '& .MuiStepLabel-label.Mui-disabled': {
        color: theme.palette.text.disabled,
      },
      '&:hover': {
        '& .MuiStepLabel-labelContainer': {
          textDecoration: 'underline',
          textDecorationColor: theme.palette.text.disabled,
          cursor: 'pointer',
        },
      },
    },
  },
}));

const StyledLoadingButton = styled(LoadingButton, {
  name: 'WmeLoadingButton',
  slot: 'Root',
})(({ theme }) => ({
  textTransform: 'none',
  paddingLeft: theme.spacing(5),
  '&.MuiButtonBase-root': {
    color: theme.palette.text.white,
    backgroundColor: theme.palette.text.disabled,
  },
}));

const WizardFooter: React.FC<WizardFooterProps> = (props) => {
  const {
    backText,
    onBack,
    nextText,
    nextEndIcon,
    nextStartIcon,
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
    hideSkip,
    hideFooter,
    disableAll,
    isLastStep = false,
    ...rest
  } = props;

  const { maxActiveStep } = useMaxActiveStep(activeStep);
  const currStep = steps[activeStep];
  const disable = disableAll || currStep?.disableAll;
  let nextButtonClassName = 'WmeWizardFooterNextButton';

  // Add class to last step button in case the theme wants unique style.
  if (isLastStep) {
    nextButtonClassName += ' isLastStep';
  }

  if (!hideFooter) {
    return (
      <WizardFooterContainer className="WmeWizardFooter-root" {...rest}>
        <Prev className="WmeWizardFooter-prev">
          {
            !currStep?.hideBack
            && (
              <Button
                startIcon={<ArrowBack />}
                onClick={onBack}
                disabled={disable}
                sx={{ marginLeft: -1 }}
              >
                {backText}
              </Button>
            )
          }
        </Prev>
        <Nav className="WmeWizardFooter-nav">
          <StyledStepper
            activeStep={maxActiveStep}
            connector={null}
            className="WmeStepper-root"
          >
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
                      className="WmeStepButton-root"
                      disabled={disable || step.disable}
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
        {
          !currStep?.hideNext
          && (
            <Next className="WmeWizardFooter-next">
              {
                (hideSkip || !currStep?.hideSkip)
                && (
                  <Skip className="WmeWizardFooter-skip">
                    <Button onClick={onSkip} disabled={disable}>{skipText}</Button>
                  </Skip>
                )
              }
              {
                isLoading ? (
                  <StyledLoadingButton
                    loading
                    variant="contained"
                    loadingPosition="start"
                  >
                    {loadingText}
                  </StyledLoadingButton>
                )
                  : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={isLastStep ? save : onNext}
                      disabled={(disableNext || currStep?.disableNext || disable)}
                      className={nextButtonClassName}
                      endIcon={nextEndIcon}
                      startIcon={nextStartIcon}
                    >
                      {nextText}
                    </Button>
                  )
              }
            </Next>
          )
        }
      </WizardFooterContainer>
    );
  }
  return null;
};

export default WizardFooter;
