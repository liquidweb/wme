import { useState } from 'react';
import { VideoEmbed } from '@moderntribe/wme-ui';
import { Box, Link, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { getVideoSource } from '@store/utils';
import { SimpleModal, ColumnLinkInterface } from '@store/components';

export interface VideoLinkInterface extends ColumnLinkInterface {
	sx?: SxProps;
}

const VideoLink: React.FC<VideoLinkInterface> = (props) => {
	const {
		title,
		url,
		target,
		modalTitle,
		sx = {}
	} = props;

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const isWp101 = url.split(':')[ 0 ] === 'wp101';
	const videoSrc = isWp101 && getVideoSource(url);

	return (
		<>
			<Link
				sx={ sx }
				href={ url && ! isWp101 ? url : undefined }
				target={ target ? target : '_self' }
				onClick={ () => isWp101 ? setModalOpen(true) : null }
			>{ title }</Link>
			{
				videoSrc && (
					<SimpleModal open={ modalOpen } onClose={ () => setModalOpen(false) }>
						<VideoEmbed src={ videoSrc } />
						{
							(title || modalTitle) && (
								<Box mt={ 4 } width="100%">
									<Typography variant="h4" mb={ 2 }>
										{ modalTitle ? modalTitle : title }
									</Typography>
								</Box>
							)
						}
					</SimpleModal>
				)
			}
		</>
	);
};

export default VideoLink;
