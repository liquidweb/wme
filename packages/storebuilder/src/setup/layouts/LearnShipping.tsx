import { useState } from 'react';
import { Typography, Grid, Box, Link } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { VideoEmbed } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { SimpleModal } from '@store/components';
import { pxToRem } from '@moderntribe/wme-utils';
import { IMAGE_DIR } from '@store/constants';

const videoAriaLabel = __('Click to play video', 'moderntribe-storebuilder');
const videoOverline = __('3 Minutes', 'moderntribe-storebuilder');
const videoHeadline = __('Understanding Flat Rate Shipping in Storebuilder', 'moderntribe-storebuilder');

const linkSx = {
	color: 'text.link',
	textDecoration: 'none',

	'&:hover': {
		color: 'text.link',
		cursor: 'pointer',
		textDecoration: 'underline',
	}
};

export interface LearnShippingInterface {
	id: string;
	type: 'learn-shipping';
}

const LearnShipping: React.FC<LearnShippingInterface> = () => {
	const [modalOpen, setModalOpen] = useState(false);

	return <>
		<Grid container columnSpacing={ 6 } rowSpacing={ 0 } mb={ 4 }>
			<Grid item xs={ 12 } sm={ 6 }>
				<Link
					component="button"
					aria-haspopup="dialog"
					onClick={ () => setModalOpen(true) }
					aria-label={ videoAriaLabel }
					sx={ {
						position: 'relative',
						display: 'block',
					} }
				>
					<Box
						component="img"
						sx={ {
							display: 'block',
							height: 'auto',
							width: '100%',
							borderRadius: 1,
							aspectRatio: '2 / 1',
							backgroundColor: 'grey.200',
						} }
						src={ `${ IMAGE_DIR }/setup-shipping-poster.png` }
						alt={ videoHeadline }
						loading="lazy"
					/>
					<Box sx={ {
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					} }>
						<Box sx={ {
							borderRadius: 14,
							backgroundColor: 'text.primary',
							width: '28px',
							height: '28px',
							color: '#FFFFFF',
							fontSize: '12px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						} }>
							<PlayArrow sx={ { color: '#FFFFFF', fontSize: '1.1rem' } } />
						</Box>
					</Box>
				</Link>
			</Grid>
			<Grid item xs={ 12 } sm={ 6 } sx={ { alignSelf: 'center' } }>
				<Typography
					variant="overline"
					mb={ 1 }
					sx={ { lineHeight: 1, fontSize: pxToRem(10) } }
				>{ videoOverline }</Typography>
				<Typography
					variant="h3"
					mb={ 1 }
				>
					<Link
						underline="hover"
						sx={
							Object.assign(
								{},
								linkSx,
								{
									color: 'text.primary',
									'&:hover': {
										color: 'text.link',
										cursor: 'pointer',
										textDecoration: 'none'
									}
								}
							)
						}
						onClick={ () => setModalOpen(true) }
					>{ videoHeadline }</Link>
				</Typography>
			</Grid>
		</Grid>
		<SimpleModal
			open={ modalOpen }
			onClose={ () => setModalOpen(false) }
		>
			<VideoEmbed src="https://www.youtube.com/embed/EXMe2i7OSQM" />
			<Box mt={ 4 } width="100%">
				<Typography variant="h4" mb={ 2 }>{ videoHeadline }</Typography>
				<Typography variant="body2">
					{ __('When setting up shipping in StoreBuilder, there are three concepts to understand: Flat Rate Shipping, Shipping Zones, and Shipping Classes. This video describes each and how they interact to ensure customers are charged correctly to ship their purchases.', 'moderntribe-storebuilder') }
				</Typography>
			</Box>
		</SimpleModal>
	</>;
};

export default LearnShipping;
