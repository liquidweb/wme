import React, { createContext, useState } from 'react';
import LookAndFeelScreenData, { LookAndFeelInterface } from '../wizards/look-and-feel/data/look-and-feel-screen-data';
import { useWizard } from '../hooks/useWizard';
export interface LookAndFeelProviderContextInterface {
  lookAndFeelState: LookAndFeelInterface;
  setInitialValues: () => void;
  resetStepData: () => void;
  setStepDataTouched: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setTemplateValue: (val: {slug: string, url: string, name: string}) => void;
  setFontValue: (font: string) => void;
  setColorValue: (color: string) => void;
  handleUpdateIframe: () => void;
  setIsImporting: () => void;
  setImportingError: () => void;
  setImportDone: () => void;
}

export const LookAndFeelContext = createContext<LookAndFeelProviderContextInterface | null>(null);

const LookAndFeelProvider = ({ children }: { children: React.ReactNode }) => {
	const { goToNextStep } = useWizard();
	const [lookAndFeelState, setLookAndFeelState] = useState<LookAndFeelInterface>(LookAndFeelScreenData());

	const setInitialValues = () => {};

	const resetStepData = () => {};

	const setStepDataTouched = () => {};

	const setTemplateValue = (val: { slug: string, url: string, name: string}) => {
		const { name, slug, url } = val;

		setLookAndFeelState({
			...lookAndFeelState,
			activeTemplate: {
				name,
				slug,
				url,
			}
		});
		goToNextStep();
	};

	const setFontValue = (font: string) => {
		setLookAndFeelState({
			...lookAndFeelState,
			font,
		});
	};

	const setColorValue = (color: string) => {
		setLookAndFeelState({
			...lookAndFeelState,
			color,
		});
	};

	const handleUpdateIframe = () => {
		setLookAndFeelState({
			...lookAndFeelState,
			updateIframe: ! lookAndFeelState.updateIframe,
		});
	};

	const setIsImporting = () => {
		setLookAndFeelState({
			...lookAndFeelState,
			isImporting: ! lookAndFeelState.isImporting,
		});
	};

	const setImportingError = () => {
		setLookAndFeelState({
			...lookAndFeelState,
			importingError: ! lookAndFeelState.importingError,
		});
	};

	const setImportDone = () => {
		setLookAndFeelState({
			...lookAndFeelState,
			importDone: ! lookAndFeelState.importDone,
		});
	};

	const setIsLoading = (isLoading: boolean) => {
		// eslint-disable-next-line no-console
		console.log(isLoading);
	};

	return (
		<LookAndFeelContext.Provider value={ {
			lookAndFeelState,
			setInitialValues,
			resetStepData,
			setStepDataTouched,
			setIsLoading,
			setTemplateValue,
			setFontValue,
			setColorValue,
			handleUpdateIframe,
			setIsImporting,
			setImportingError,
			setImportDone,
		} }>
			{ children }
		</LookAndFeelContext.Provider>
	);
};

export default LookAndFeelProvider;
