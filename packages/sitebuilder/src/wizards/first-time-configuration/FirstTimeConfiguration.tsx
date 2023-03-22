import FirstTimeConfigurationWizard from '@sb/wizards/first-time-configuration/components/FirstTimeConfigurationWizard';
import FirstTimeConfigurationProvider from '@sb/contexts/FirstTimeConfigurationProvider';

const FirstTimeConfiguration = () => (
	<FirstTimeConfigurationProvider>
		<FirstTimeConfigurationWizard />
	</FirstTimeConfigurationProvider>
);

export default FirstTimeConfiguration;
