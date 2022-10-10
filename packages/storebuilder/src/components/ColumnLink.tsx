import React, { useState, FC } from 'react';
import {
	SetupCardListItem,
	VideoEmbed
} from '@stellarwp/wme-ui';
import { DialogContentText } from '@mui/material';
import { getVideoSource } from '@store/utils';
import { SimpleModal } from '@store/components';
import SvgIcon from '@mui/material/SvgIcon';
import Add from '@mui/icons-material/Add';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import Upload from '@mui/icons-material/Upload';
import School from '@mui/icons-material/School';
import Downloading from '@mui/icons-material/Downloading';

type SvgIconComponent = typeof SvgIcon;

const icons: {
	[key: string]: SvgIconComponent
} = {
	Add,
	Downloading,
	LocalLibrary,
	School,
	Upload
};

export interface ColumnLinkInterface {
	title: string;
	url: string;
	target?: string;
	icon?: string;
	modalTitle?: string;
}

const ColumnLink: FC<ColumnLinkInterface> = (props) => {
	const {
		title,
		url,
		target,
		icon,
		modalTitle
	} = props;

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const isWp101 = url.split(':')[ 0 ] === 'wp101';
	const videoSrc = isWp101 && getVideoSource(url);
	const IconComponent = icon && typeof icons[ icon as string ] !== 'undefined' ? icons[ icon ] : Add;

	const handleOnClick = () => {
		setModalOpen(true);
	};

	return (
		<>
			<SetupCardListItem
				title={ title }
				href={ url && ! isWp101 ? url : undefined }
				icon={ <IconComponent /> }
				linkProps={ {
					target: target ? target : '_self',
					onClick: () => isWp101 ? handleOnClick() : null
				} }
			/>
			{
				videoSrc && (
					<SimpleModal open={ modalOpen } onClose={ () => setModalOpen(false) }>
						<VideoEmbed src={ videoSrc } />
						{
							modalTitle && (
								<DialogContentText>
									{ modalTitle }
								</DialogContentText>
							)
						}
					</SimpleModal>
				)
			}
		</>
	);
};

export default ColumnLink;
