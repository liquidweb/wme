import ScreenWrapper from '@sb/wizards/first-time-configuration/components/ScreenWrapper';
import { useFirstTimeConfiguration } from '@sb/hooks';
// import { FtcStringData } from '@ftc/data/constants';
// const { contentDetails } = FtcStringData;

const Content = () => {
	const { ftcState: { form } } = useFirstTimeConfiguration();

	// useEffect(() => {
	// 	if (! form || isLoading) {
	// 		return;
	// 	}

	// 	shouldAllowNextStep(form.siteDescription.value && form.sitePersonality.value && form.siteKeywords.value, 3);
	// }, [form, isLoading]);

	return (
		<ScreenWrapper sx={ { maxWidth: 425, width: 425 } }>
			<div>Hello there. Add content here.</div>
			{ JSON.stringify(form) }
		</ScreenWrapper>
	);
};

export default Content;
