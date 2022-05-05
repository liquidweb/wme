/**
 * We use useQueryParam to handle if the modal should be open or not.
 * We can have only one wizard modal open at a time.
 * Pass Wizard name to useWizardModal as a string
 */

import { useState } from 'react';
import {
  useQueryParam,
  StringParam,
} from 'use-query-params';

export const QUERY_PARAM_NAME = 'wizard';

export function useWizardModal(wizardName:string) {
  const [currentWizard, setWizard] = useQueryParam(QUERY_PARAM_NAME, StringParam);
  const [closeWarning, setCloseWarning] = useState<boolean>(false);

  const forceClose = () => {
    setCloseWarning(false);
    setWizard(null);
  };

  if (!wizardName) {
    return { currentWizard, forceClose };
  }

  const isVisible = currentWizard === wizardName;

  const close = () => {
    if (!closeWarning) {
      setCloseWarning(true);
      return;
    }
    setWizard(null);
  };
  const open = () => {
    setWizard(wizardName);
  };

  return {
    currentWizard,
    open,
    close,
    isVisible,
    forceClose,
    modalProps: {
      open: isVisible,
      onClose: close,
      closeWarning,
      setCloseWarning,
    },
  };
}
