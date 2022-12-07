import { useContext } from '@wordpress/element';
import { LookAndFeelContext, LookAndFeelProviderContextInterface } from '../contexts/LookAndFeelProvider';

export function useLookAndFeel() {
	const {
		lookAndFeelState,
		templates,
		setTemplateValue,
		setFontValue,
		setColorValue,
		setImportingError,
		setImportDone,
		initImport,
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
		setImportingError,
		setImportDone,
		initImport,
		handleImport,
		setShowDeleteWarning,
		setDeleteValue,
		ajaxTemplateData
	};
}
