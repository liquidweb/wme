import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupCardTask as WmeSetupCardTask, Button } from '@moderntribe/wme-ui';
import { Avatar } from '@mui/material';
import { IMAGE_DIR } from '@store/constants';
import { isValidUrl } from '@store/utils';

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
		button,
		url,
		connected = false,
		disableText = '',
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

	return (
		<WmeSetupCardTask
			{ ...rest }
			onClick={ ! validUrl ? handleOnClick : undefined }
			href={ validUrl ? url : undefined }
			variant={ isVariant ? type : 'task' }
			avatar={
				Object.keys(avatarProps).length > 0 && (
					<Avatar { ...avatarProps } />
				)
			}
			button={
				button && (
					<Button
						variant="contained"
						color="primary"
						onClick={ ! connected ? handleOnClick : undefined }
						href={ connected && validUrl ? url : undefined }
						sx={ {
							...(button.backgroundColor && {
								backgroundColor: button.backgroundColor,
							}),
						} }
					>
						{ connected && disableText ? disableText : button.label }
					</Button>
				)
			}
		/>
	);
};

export default SetupCardTask;
