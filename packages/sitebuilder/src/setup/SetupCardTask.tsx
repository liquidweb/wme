import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupCardTask as WmeSetupCardTask } from '@stellarwp/wme-ui';
import { Avatar } from '@mui/material';
import { IMAGE_DIR } from '@sb/constants';
import { isValidUrl } from '@sb/utils';

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
		...rest
	} = props;

	const avatarProps = getAvatarProps(props);
	const isVariant = type === 'task' || type === 'action';

	const navigate = useNavigate();

	const validUrl = url && isValidUrl(url);

	const onClick = () => {
		if (url) {
			navigate(url);
		}
	};

	return <WmeSetupCardTask
		{ ...rest }
		onClick={ ! validUrl ? onClick : undefined }
		href={ validUrl ? url : undefined }
		variant={ isVariant ? type : 'task' }
		avatar={ Object.keys(avatarProps).length > 0 && <Avatar { ...avatarProps } /> }
	/>;
};

export default SetupCardTask;
