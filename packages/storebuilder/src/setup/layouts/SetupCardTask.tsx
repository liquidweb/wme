import { useNavigate } from 'react-router-dom';
import { Button, SetupCardTask as WmeSetupCardTask } from '@moderntribe/wme-ui';
import { Icon } from '@mui/material';
import { IMAGE_DIR } from '@store/constants';
import { isValidUrl } from '@moderntribe/wme-utils';

const getAvatarProps = (props: SetupCardRowInterface) => {
	if (! props?.icon) {
		return {};
	}

	return {
		alt: props?.title,
		src: `${ IMAGE_DIR + props.icon }`,
		width: '100%',
	};
};

const SetupCardTask = (props: SetupCardRowInterface) => {
	const {
		url,
		wizardHash,
		button,
		...rest
	} = props;

	const avatarProps = getAvatarProps(props);

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
		icon={ Object.keys(avatarProps).length > 0 && (<Icon><img { ...avatarProps } alt="icon" /></Icon>) }
		button={ <FormattedButton label={ button?.label } href={ button?.href } backgroundColor={ button?.backgroundColor } /> }
	/>;
};

function FormattedButton({ href, label, backgroundColor }: { href?: string, label?: string, backgroundColor?: string}) {
	if (! label || ! href) {
		return <div />;
	}

	return (
		<Button href={ href } style={ { backgroundColor } }>{ label }</Button>
	);
}

export default SetupCardTask;
