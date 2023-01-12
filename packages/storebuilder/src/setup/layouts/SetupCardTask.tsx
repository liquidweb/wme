import { useNavigate } from 'react-router-dom';
import { Button, SetupCardTask as WmeSetupCardTask } from '@moderntribe/wme-ui';
import { isValidUrl } from '@moderntribe/wme-utils';

type SetupCardTaskInterface = SetupCardRowInterface | SetupRowColumnsInterface | SetupRowButtonInterface | SetupRowLearnInterface;

const SetupCardTask = (props: SetupCardTaskInterface) => {
	const {
		url,
		wizardHash,
		button,
		...rest
	} = props;

	const navigate = useNavigate();

	const validUrl = url && isValidUrl(url);

	const handleOnClick = () => {
		if (wizardHash) {
			navigate(wizardHash);
		}
	};

	return <WmeSetupCardTask
		{ ...rest }
		onClick={ ! validUrl && wizardHash ? handleOnClick : undefined }
		href={ validUrl ? url : undefined }
		button={ button && <FormattedButton label={ button?.label } href={ button?.href } backgroundColor={ button?.backgroundColor } /> }
	/>;
};

function FormattedButton({ href, label, backgroundColor }: { href?: string, label?: string, backgroundColor?: string}) {
	const textColor = backgroundColor ? '#FFF' : '#000';

	return (
		<Button href={ href } style={ { backgroundColor, color: textColor } }>{ label }</Button>
	);
}

export default SetupCardTask;
