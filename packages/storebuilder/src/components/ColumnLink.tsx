import React, { useState, FC } from 'react';
import {
	SetupCardListItem,
	VideoEmbed
} from '@stellarwp/wme-ui';
import { DialogContentText } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { getVideoSource } from '@store/utils';
import { SimpleModal } from '@store/components';

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

	const IconComponent = icon && Icons[ icon as keyof typeof Icons ] ? Icons[ icon as keyof typeof Icons ] : null;

	const handleOnClick = () => {
		setModalOpen(true);
	};

	return (
		<>
			<SetupCardListItem
				title={ title }
				href={ url && ! isWp101 ? url : undefined }
				icon={ IconComponent ? <IconComponent /> : null }
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
