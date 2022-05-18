import { useState, useEffect } from 'react';

export function useMaxActiveStep(activeStep = -1) {
  const [maxActiveStep, setLatestActiveStep] = useState<number>(-1);
  useEffect(() => {
    if (activeStep > maxActiveStep) {
      setLatestActiveStep(activeStep);
    }
  }, [maxActiveStep, activeStep]);

  return { maxActiveStep };
}
