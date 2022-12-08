import { useNavigate } from 'react-router-dom';
import { SetupCardTask as WmeSetupCardTask } from '@moderntribe/wme-ui';
import { isValidUrl } from '@moderntribe/wme-utils';
import { Avatar } from '@mui/material';
import { IMAGE_DIR } from '@sb/constants';

const getAvatarProps = (props: SetupCardRowInterface) => {
	if (! props?.icon) {
		return {};
	}

	return {
		alt: props?.title,
		src: `${ IMAGE_DIR + props.icon }`,
	};
};

const SetupCardTask = (props: SetupCardRowInterface) => {
	const {
		type,
		url,
		wizardHash,
		...rest
	} = props;

	const avatarProps = getAvatarProps(props);
	const isVariant = type === 'task' || type === 'action';

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
		variant={ isVariant ? type : 'task' }
		avatar={ Object.keys(avatarProps).length > 0 && <Avatar { ...avatarProps } /> }
	/>;
};

export default SetupCardTask;
