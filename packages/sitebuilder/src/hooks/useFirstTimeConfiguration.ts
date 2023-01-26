import { useContext } from 'react';
import { FirstTimeConfigurationContext, FtcProviderContextInterface } from '../contexts/FirstTimeConfigurationProvider';

export function useFirstTimeConfiguration() {
	const context = useContext(FirstTimeConfigurationContext);
	return context as FtcProviderContextInterface;
}
