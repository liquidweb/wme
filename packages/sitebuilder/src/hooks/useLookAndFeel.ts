import { useContext } from 'react';
import { LookAndFeelContext, LookAndFeelProviderContextInterface } from '../contexts/LookAndFeelProvider';

export function useLookAndFeel() {
	const {
		lookAndFeelState,
		templates,
		setTemplateValue,
		setFontValue,
		setColorValue,
		setIsImporting,
		setImportingError,
		handleSave,
		handleImport,
		setShowDeleteWarning,
		setDeleteValue,
		ajaxTemplateData
	} = useContext(LookAndFeelContext) as LookAndFeelProviderContextInterface;
	return {
		lookAndFeelState,
		templates,
		setTemplateValue,
		setFontValue,
		setColorValue,
		setIsImporting,
		setImportingError,
		handleSave,
		handleImport,
		setShowDeleteWarning,
		setDeleteValue,
		ajaxTemplateData
	};
}
