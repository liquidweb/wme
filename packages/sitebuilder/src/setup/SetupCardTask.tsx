import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupCardTask as WmeSetupCardTask } from '@moderntribe/wme-ui';
import { isValidUrl } from '@moderntribe/wme-utils';
import { Icon } from '@mui/material';
import { IMAGE_DIR } from '@sb/constants';

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
	/>;
};

export default SetupCardTask;
