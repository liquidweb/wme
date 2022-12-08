import FirstTimeConfigurationWizard from '@ftc/FirstTimeConfigurationWizard';
import FirstTimeConfigurationProvider from '@sb/contexts/FirstTimeConfigurationProvider';

const FirstTimeConfiguration = () => (
	<FirstTimeConfigurationProvider>
		<FirstTimeConfigurationWizard />
	</FirstTimeConfigurationProvider>
);

export default FirstTimeConfiguration;
